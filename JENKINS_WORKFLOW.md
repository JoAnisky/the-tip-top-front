# Pipeline CI/CD — the-tip-top-front

## Vue d'ensemble

Pipeline Jenkins déclarative (`agent none`) déclenchée à chaque push sur `main`.  
Les stages de déploiement Kubernetes sont conditionnels à la branche `origin/main`.

```
Checkout → Tests → Publish Reports → Build & Push Docker → K8s Secrets → Deploy → Verify
```

---

## Stages

### Checkout
Récupère le code source depuis GitHub.  
Agent : `any` (nœud Jenkins principal).

---

### Tests
Agent : pod Kubernetes éphémère (`mcr.microsoft.com/playwright:v1.58.2-noble`), défini dans `k8s/jenkins/test-pod.yaml`.

**Étapes :**
1. `npm install` + `npx nuxt prepare` — installation des dépendances et génération des types Nuxt (`npx nuxt prepare` est nécessaire car Vitest a besoin des types générés par Nuxt pour fonctionner dans le pod)
2. `npm run test:report` — exécute Vitest (tests unitaires, fonctionnels, intégration Nuxt), génère `test-results/vitest/junit.xml`
3. `npm run test:e2e:ci` — exécute Playwright contre `https://the-tip-top.jonathanlore.fr`, génère `playwright-report/index.html`

Les credentials de test (`TEST_USER_EMAIL`, `TEST_USER_PASSWORD`) sont injectés via Jenkins Credentials Store.  
Les deux commandes sont suivies de `|| true` — un échec de test ne bloque pas le pipeline.

**Post :** les résultats sont stashés sous le nom `test-reports` pour transfert vers l'agent suivant (voir section [Transfert de fichiers entre agents](#transfert-de-fichiers-entre-agents)).

---

### Publish Reports
Agent : `any` (nœud Jenkins principal), avec `skipDefaultCheckout true` pour ne pas écraser les fichiers restaurés par le unstash.

**Étapes :**
1. `unstash 'test-reports'` — restaure les fichiers générés dans le pod
2. Publication JUnit (`test-results/**/*.xml`) — visible dans l'onglet **Résultats des tests**
3. Publication HTML (`playwright-report/`) — visible dans l'onglet **Playwright Report**

**Post :** `cleanWs()` nettoie le workspace.

---

### Build & Push Docker
Construit l'image de production avec le tag `BUILD_NUMBER` et la pousse sur Docker Hub.

```
joanisky/the-tip-top-front:<BUILD_NUMBER>
```

Credential utilisé : `jenkins-dockerhub`.

---

### Create/Update Kubernetes Secrets
*(conditionnel : branche `origin/main`)*

Crée ou met à jour le secret `nuxt-front-secrets` dans le namespace `the-tip-top-front` avec le mot de passe de session Nuxt.  
Credential utilisé : `nuxt-session-password`, `kubeconfig`.

---

### Deploy to Kubernetes
*(conditionnel : branche `origin/main`)*

1. `kubectl apply -k k8s/` — applique les manifestes (Deployment, Service, Ingress, ConfigMap)
2. `kubectl set image` — met à jour l'image avec le tag du build courant
3. `kubectl rollout status` — attend la fin du rollout (timeout 300s)

---

### Verify Deployment
*(conditionnel : branche `origin/main`)*

Affiche dans les logs l'état des Pods, Services, Ingress, Secrets et ConfigMaps du namespace.

---

## Post global

Supprime l'image Docker locale pour ne pas saturer le disque du VPS Jenkins, puis envoie une notification Discord selon le résultat du pipeline :

```
always   → docker rmi (node built-in)
success  → discordSend — message de succès avec lien build
failure  → discordSend — message d'échec avec lien logs
```

`discordSend` est un step de plugin Jenkins — il ne nécessite pas de `node()` explicite ni d'agent déclaré.  
Credential utilisé : `discord-webhook-url`.

---

## Transfert de fichiers entre agents

### Problème

Chaque stage peut tourner sur un agent différent, chacun avec son propre système de fichiers isolé :

```
Stage Tests         → pod Kubernetes éphémère   (filesystem A)
Stage Publish       → nœud Jenkins principal    (filesystem B)
```

Les fichiers générés dans le pod (XML, HTML) n'existent que dans le filesystem A. Sans mécanisme de transfert, le stage `Publish Reports` ne les voit pas.

### Solution : stash / unstash

Jenkins stocke temporairement les fichiers sur le master entre deux stages, puis les restaure à la demande.

```
Pod Kubernetes              Jenkins Master            Nœud Jenkins
      │                           │                        │
      │  stash('test-reports')    │                        │
      │ ─────────────────────────>│  (stockage temporaire) │
      │                           │                        │
      │                           │   unstash('test-reports')
      │                           │ ──────────────────────>│
      │                           │                        │ junit + publishHTML
```

```groovy
// Dans le post du stage Tests (pod Kubernetes)
stash includes: 'test-results/**/*,playwright-report/**/*', name: 'test-reports', allowEmpty: true

// Dans les steps du stage Publish Reports (nœud Jenkins)
unstash 'test-reports'
```

### Règles à respecter

**`skipDefaultCheckout true` est obligatoire** sur tout stage qui fait un `unstash`. Sans cette option, Jenkins effectue automatiquement un `checkout scm` au début du stage, ce qui écrase les fichiers restaurés par le `unstash` avec le contenu du dépôt Git.

**Tout fichier généré dans un pod doit être stasché** avant la fin du stage — le pod est détruit immédiatement après et son filesystem avec lui.

**`agent none` global est nécessaire** pour éviter un deadlock. Avec `agent any` global, Jenkins réserve l'unique executor du nœud principal pour toute la durée du pipeline. Quand un stage suivant demande lui aussi un `agent any`, il n'y a plus d'executor disponible → blocage infini sur "Waiting for next available executor". Avec `agent none`, chaque stage libère l'executor dès qu'il a terminé.

**Attention aux conflits de dossiers** : si plusieurs outils écrivent dans le même dossier, ils peuvent s'écraser mutuellement. Dans ce projet, Playwright réinitialisait `test-results/` au démarrage et supprimait le XML Vitest déjà généré. Solution : configurer un `outputDir` séparé dans `playwright.config.ts` :

```ts
outputDir: 'test-results/playwright/artifacts'
```

---

## Rapports de test

| Rapport | Emplacement dans Jenkins |
|---|---|
| Résultats des tests (JUnit) | Onglet **Résultats des tests** |
| Rapport Playwright (HTML) | Onglet **Playwright Report** |

Le rapport Playwright nécessite une CSP assouplie sur Jenkins. La propriété `hudson.model.DirectoryBrowserSupport.CSP` est configurée dans `JAVA_OPTS` via un ConfigMap Kubernetes (`jenkins-java-opts`) monté dans le Deployment Jenkins ([repository de l'infrastructure k8s](https://github.com/JoAnisky/k8s)) . Sans cette configuration, les scripts inline du rapport sont bloqués par le navigateur et la page s'affiche vide.

---

## Fichiers clés

| Fichier | Rôle                                                                |
|---|---------------------------------------------------------------------|
| `Jenkinsfile` | Définition de la pipeline                                           |
| `k8s/jenkins/test-pod.yaml` | Pod Playwright pour les tests                                       |
| `vitest.config.ts` | Config Vitest (3 projets : unit, functional, nuxt)                  |
| `playwright.config.ts` | Config Playwright E2E                                               |
| `tests/e2e/spin.spec.ts` | Test E2E login + soumission de code                                 |
| `.env.test` | Variables d'environnement pour les tests en local (non commité) |