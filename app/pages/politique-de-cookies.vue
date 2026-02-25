<script setup lang="ts">
useSeoPage({
  title: 'Politique de cookies — Confidentialité Thé Tip Top',
  description: 'Découvrez comment Thé Tip Top utilise les cookies : connexion, préférences, analytics et réseaux sociaux. Gérez vos préférences à tout moment en toute transparence.',
})

const cookieTypes = [
  {
    category: 'Cookies strictement nécessaires',
    icon: 'i-heroicons-shield-check',
    canDisable: false,
    description: 'Indispensables au fonctionnement du site. Ils vous permettent de vous connecter et de participer au jeu. Ils ne peuvent pas être désactivés.',
    cookies: [
      { name: 'Cookie de connexion', purpose: 'Maintient votre session ouverte pendant votre navigation', duration: '15 minutes', provider: 'Thé Tip Top' },
      { name: 'Cookie de reconnexion', purpose: 'Vous évite de vous reconnecter à chaque visite', duration: '30 jours', provider: 'Thé Tip Top' },
    ],
  },
  {
    category: 'Cookies de préférences',
    icon: 'i-heroicons-adjustments-horizontal',
    canDisable: true,
    description: "Permettent de mémoriser vos choix sur le site (préférences d'affichage, gestion des cookies).",
    cookies: [
      { name: 'Préférences cookies', purpose: 'Mémorise votre réponse au bandeau de consentement', duration: '12 mois', provider: 'Thé Tip Top' },
    ],
  },
  {
    category: "Cookies de mesure d'audience",
    icon: 'i-heroicons-chart-bar',
    canDisable: true,
    description: "Nous aident à comprendre comment les visiteurs utilisent le site, afin de l'améliorer. Ces données sont anonymisées.",
    cookies: [
      { name: 'Google Analytics', purpose: 'Mesure du nombre de visites, des pages consultées et du parcours des visiteurs', duration: '2 ans', provider: 'Google' },
    ],
  },
  {
    category: 'Cookies de connexion sociale',
    icon: 'i-heroicons-user-group',
    canDisable: true,
    description: 'Déposés uniquement si vous choisissez de vous connecter via votre compte Google ou Facebook.',
    cookies: [
      { name: 'Connexion Google', purpose: 'Maintient votre session lors d\'une connexion via Google', duration: 'Session', provider: 'Google' },
      { name: 'Connexion Facebook', purpose: 'Maintient votre session lors d\'une connexion via Facebook', duration: '3 mois', provider: 'Meta (Facebook)' },
    ],
  },
]
</script>

<template>
  <div class="min-h-screen bg-gradient-ttt-dark text-white">
    <!-- Hero -->
    <section class="relative py-16 px-4 border-b border-white/10">
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-sm uppercase tracking-widest text-ttt-orange mb-3 font-medium">Transparence &amp; vie privée</p>
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">Politique de cookies</h1>
        <p class="text-white/80 text-sm">Dernière mise à jour : janvier 2025</p>
      </div>
    </section>

    <!-- Content -->
    <div class="cgu-cookies-legals-content">

      <!-- Intro -->
      <section>
        <h2 class="text-xl font-bold text-ttt-orange mb-1">Qu'est-ce qu'un cookie ?</h2>
        <UDivider class="mb-4" />
        <p class="mb-3">
          Un cookie est un petit fichier texte déposé sur votre appareil (ordinateur, smartphone, tablette)
          lors de votre visite sur un site web. Il permet au site de mémoriser des informations sur votre
          navigation afin d'améliorer votre expérience.
        </p>
        <p>
          Conformément à la loi, les cookies non indispensables au fonctionnement du site nécessitent
          votre accord avant d'être déposés. Vous pouvez modifier vos choix à tout moment depuis
          le lien « Gérer mes cookies » en bas de page.
        </p>
      </section>

      <!-- Utilisation -->
      <section>
        <h2 class="text-xl font-bold text-ttt-orange mb-1">À quoi servent nos cookies ?</h2>
        <UDivider class="mb-4" />
        <p class="mb-3">Sur ce site, les cookies sont utilisés pour :</p>
        <ul class="space-y-2 text-sm">
          <li class="flex gap-2"><span class="text-ttt-orange">•</span> Vous maintenir connecté pendant votre navigation</li>
          <li class="flex gap-2"><span class="text-ttt-orange">•</span> Mémoriser votre réponse au bandeau de consentement</li>
          <li class="flex gap-2"><span class="text-ttt-orange">•</span> Mesurer la fréquentation du site de façon anonyme (avec votre accord)</li>
          <li class="flex gap-2"><span class="text-ttt-orange">•</span> Permettre la connexion via Google ou Facebook si vous le souhaitez (avec votre accord)</li>
        </ul>
      </section>

      <!-- Tableau détaillé -->
      <section>
        <h2 class="text-xl font-bold text-ttt-orange mb-1">Détail des cookies utilisés</h2>
        <UDivider class="mb-4" />
        <div class="space-y-8">
          <div v-for="type in cookieTypes" :key="type.category">
            <div class="flex items-start justify-between gap-4 mb-3">
              <div class="flex items-center gap-2">
                <UIcon :name="type.icon" class="text-ttt-orange w-5 h-5 flex-shrink-0" />
                <h3 class="text-white font-semibold">{{ type.category }}</h3>
              </div>
              <UBadge
                  :label="type.canDisable ? 'Optionnel' : 'Obligatoire'"
                  :color="type.canDisable ? 'yellow' : 'primary'"
                  variant="subtle"
                  size="sm"
                  class="flex-shrink-0"
              />
            </div>
            <p class="text-sm text-white/80 mb-3">{{ type.description }}</p>
            <div class="overflow-x-auto rounded-xl border border-white/10">
              <table class="w-full text-sm">
                <thead>
                <tr class="bg-white/5 text-white/80 text-xs uppercase tracking-wide">
                  <th class="text-left px-4 py-2">Cookie</th>
                  <th class="text-left px-4 py-2 hidden sm:table-cell">À quoi il sert</th>
                  <th class="text-left px-4 py-2">Durée</th>
                  <th class="text-left px-4 py-2 hidden md:table-cell">Émetteur</th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for="(cookie, i) in type.cookies"
                    :key="cookie.name"
                    :class="i % 2 === 0 ? 'bg-white/0' : 'bg-white/[0.03]'"
                >
                  <td class="px-4 py-3 font-medium text-white">{{ cookie.name }}</td>
                  <td class="px-4 py-3 text-white hidden sm:table-cell">{{ cookie.purpose }}</td>
                  <td class="px-4 py-3 text-white/80 whitespace-nowrap">{{ cookie.duration }}</td>
                  <td class="px-4 py-3 text-white/80 hidden md:table-cell">{{ cookie.provider }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- Gérer -->
      <section>
        <h2 class="text-xl font-bold text-ttt-orange mb-1">Gérer vos préférences</h2>
        <UDivider class="mb-4" />
        <p class="mb-3">
          Lors de votre première visite, un bandeau vous permet d'accepter ou de refuser les cookies
          optionnels. Vous pouvez revenir sur votre choix à tout moment depuis le bouton
          « Paramètres des cookies » (rond blanc contenant une icone de cookie) en bas à gauche de la page.
        </p>
        <p class="mb-4">
          Vous pouvez aussi paramétrer votre navigateur pour bloquer ou supprimer les cookies.
          Attention : bloquer les cookies de connexion vous empêchera de vous connecter au site.
        </p>
        <div class="grid sm:grid-cols-2 gap-4 text-sm">
          <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener"
             class="bg-white/5 hover:bg-white/10 transition rounded-xl px-4 py-3 flex items-center gap-2">
            <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4 text-ttt-orange flex-shrink-0" />
            <span class="text-white">Gérer sur Chrome</span>
          </a>
          <a href="https://support.mozilla.org/fr/kb/cookies-informations-sites-enregistrent" target="_blank" rel="noopener"
             class="bg-white/5 hover:bg-white/10 transition rounded-xl px-4 py-3 flex items-center gap-2">
            <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4 text-ttt-orange flex-shrink-0" />
            <span class="text-white">Gérer sur Firefox</span>
          </a>
          <a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noopener"
             class="bg-white/5 hover:bg-white/10 transition rounded-xl px-4 py-3 flex items-center gap-2">
            <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4 text-ttt-orange flex-shrink-0" />
            <span class="text-white">Gérer sur Safari</span>
          </a>
          <a href="https://support.microsoft.com/fr-fr/windows/g%C3%A9rer-les-cookies-dans-microsoft-edge-afficher-autoriser-bloquer-supprimer-et-utiliser-168dab11-0753-043d-7c16-ede5947fc64d#bkmk_deleteallcookies" target="_blank" rel="noopener"
             class="bg-white/5 hover:bg-white/10 transition rounded-xl px-4 py-3 flex items-center gap-2">
            <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4 text-ttt-orange flex-shrink-0" />
            <span class="text-white">Gérer sur Edge</span>
          </a>
        </div>
      </section>

      <!-- Contact -->
      <section>
        <h2 class="text-xl font-bold text-ttt-orange mb-1">Contact &amp; droits</h2>
        <UDivider class="mb-4" />
        <p class="mb-3">
          Pour toute question sur l'utilisation de vos données ou sur cette politique,
          vous pouvez contacter notre responsable de la protection des données :
        </p>
        <div class="bg-white/5 rounded-xl p-4 space-y-1 text-sm">
          <p class="text-white font-medium">Thé Tip Top — Protection des données</p>
          <p>📍 18 rue Léon Frot, 75011 Paris</p>
          <p>✉️ <a href="mailto:webmaster@thetiptop.fr" class="text-ttt-orange hover:underline">webmaster@thetiptop.fr</a></p>
        </div>
        <p class="mt-3 text-sm text-white/80">
          Vous pouvez également déposer une réclamation auprès de la
          <a href="https://www.cnil.fr" target="_blank" rel="noopener" class="text-ttt-orange hover:underline">CNIL</a>
          si vous estimez que vos droits ne sont pas respectés.
        </p>
      </section>

      <!-- Évolution -->
      <section>
        <h2 class="text-xl font-bold text-ttt-orange mb-1">Mises à jour de cette politique</h2>
        <UDivider class="mb-4" />
        <p>
          Cette politique peut être mise à jour à tout moment pour refléter des évolutions légales
          ou des changements dans notre utilisation des cookies. La version en vigueur est toujours
          celle affichée sur cette page.
        </p>
      </section>

      <!-- Nav liens -->
      <div class="pt-6 border-t border-white/10 flex flex-wrap gap-4 text-sm">
        <NuxtLink to="/mentions-legales" class="text-ttt-orange hover:underline">→ Mentions légales</NuxtLink>
        <NuxtLink to="/reglement" class="text-ttt-orange hover:underline">→ Règlement du jeu</NuxtLink>
      </div>
    </div>
  </div>
</template>