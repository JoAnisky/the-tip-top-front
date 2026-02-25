<script setup lang="ts">
definePageMeta({ layout: 'default' })
useHead({ title: 'Politique de cookies — Thé Tip Top' })

const cookieTypes = [
  {
    category: 'Cookies strictement nécessaires',
    icon: 'i-heroicons-shield-check',
    canDisable: false,
    description: 'Indispensables au fonctionnement du site. Ils ne peuvent pas être désactivés.',
    cookies: [
      { name: 'access_token', purpose: 'Jeton d\'authentification JWT (HTTP-only)', duration: '15 minutes', provider: 'Thé Tip Top' },
      { name: 'refresh_token', purpose: 'Jeton de renouvellement de session (HTTP-only)', duration: '30 jours', provider: 'Thé Tip Top' },
      { name: 'PHPSESSID', purpose: 'Gestion de la session serveur Symfony', duration: 'Session', provider: 'Thé Tip Top' },
    ],
  },
  {
    category: 'Cookies de préférences',
    icon: 'i-heroicons-adjustments-horizontal',
    canDisable: true,
    description: 'Permettent de mémoriser vos préférences (langue, affichage, consentement cookies).',
    cookies: [
      { name: 'cookie_consent', purpose: 'Enregistrement de votre choix de consentement', duration: '12 mois', provider: 'Thé Tip Top' },
    ],
  },
  {
    category: 'Cookies analytiques',
    icon: 'i-heroicons-chart-bar',
    canDisable: true,
    description: 'Nous aident à comprendre comment les visiteurs interagissent avec le site (pages vues, parcours, erreurs).',
    cookies: [
      { name: '_ga', purpose: 'Identifiant unique de visiteur Google Analytics', duration: '2 ans', provider: 'Google' },
      { name: '_ga_XXXXXXXX', purpose: 'Persistance de la session Analytics', duration: '2 ans', provider: 'Google' },
      { name: '_gid', purpose: 'Distinction des utilisateurs Analytics', duration: '24 heures', provider: 'Google' },
    ],
  },
  {
    category: 'Cookies tiers — Authentification sociale',
    icon: 'i-heroicons-user-group',
    canDisable: true,
    description: 'Déposés uniquement si vous utilisez la connexion via Google ou Facebook.',
    cookies: [
      { name: 'G_AUTHUSER_H', purpose: 'Session de connexion Google OAuth', duration: 'Session', provider: 'Google' },
      { name: 'fr', purpose: 'Cookie de session Facebook Connect', duration: '3 mois', provider: 'Meta (Facebook)' },
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
          Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, smartphone, tablette)
          lors de votre visite sur un site web. Il permet au site de mémoriser des informations sur votre
          navigation afin d'améliorer votre expérience ou de réaliser des mesures d'audience.
        </p>
        <p>
          Conformément à la réglementation française et européenne (directive ePrivacy, RGPD), les cookies
          non essentiels nécessitent votre consentement préalable. Vous pouvez à tout moment modifier vos
          préférences en utilisant notre gestionnaire de cookies.
        </p>
      </section>

      <!-- Section : comment nous utilisons les cookies -->
      <section>
        <h2 class="text-xl font-bold text-ttt-orange mb-1">Comment utilisons-nous les cookies ?</h2>
        <UDivider class="mb-4" />
        <p class="mb-3">
          Le site <span class="text-white">www.the-tip-top.jonathanlore.fr</span> utilise des cookies
          dans les situations suivantes :
        </p>
        <ul class="space-y-2 text-sm">
          <li class="flex gap-2"><span class="text-ttt-orange">•</span> Maintenir votre session de connexion de manière sécurisée (cookies JWT HTTP-only)</li>
          <li class="flex gap-2"><span class="text-ttt-orange">•</span> Mémoriser vos préférences d'affichage et de langue</li>
          <li class="flex gap-2"><span class="text-ttt-orange">•</span> Mesurer l'audience et analyser l'utilisation du site (avec votre consentement)</li>
          <li class="flex gap-2"><span class="text-ttt-orange">•</span> Permettre la connexion via Google ou Facebook (avec votre consentement)</li>
        </ul>
      </section>

      <!-- Section : tableau détaillé -->
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
                  :color="type.canDisable ? 'warning' : 'success'"
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
                  <th class="text-left px-4 py-2">Nom</th>
                  <th class="text-left px-4 py-2 hidden sm:table-cell">Finalité</th>
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
                  <td class="px-4 py-3 font-mono text-xs text-ttt-orange">{{ cookie.name }}</td>
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

      <!-- Section : gérer les cookies -->
      <section>
        <h2 class="text-xl font-bold text-ttt-orange mb-1">Gérer vos préférences</h2>
        <UDivider class="mb-4" />
        <p class="mb-3">
          Lors de votre première visite sur le site, un bandeau vous permet d'accepter ou de refuser les
          cookies non essentiels. Vous pouvez revenir sur votre choix à tout moment depuis le lien
          « Gérer mes cookies » présent en bas de page.
        </p>
        <p class="mb-3">
          Vous pouvez également configurer votre navigateur pour bloquer ou supprimer les cookies.
          Notez que désactiver les cookies strictement nécessaires peut empêcher le fonctionnement
          de certaines fonctionnalités essentielles du site (connexion, participation au jeu).
        </p>
        <div class="grid sm:grid-cols-2 gap-4 mt-4 text-sm">
          <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener"
             class="bg-white/5 hover:bg-white/10 transition rounded-xl px-4 py-3 flex items-center gap-2">
            <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4 text-ttt-orange flex-shrink-0" />
            <span class="text-white">Gérer les cookies sur <span class="text-white">Chrome</span></span>
          </a>
          <a href="https://support.mozilla.org/fr/kb/cookies-informations-sites-enregistrent" target="_blank" rel="noopener"
             class="bg-white/5 hover:bg-white/10 transition rounded-xl px-4 py-3 flex items-center gap-2">
            <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4 text-ttt-orange flex-shrink-0" />
            <span class="text-white">Gérer les cookies sur <span class="text-white">Firefox</span></span>
          </a>
          <a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noopener"
             class="bg-white/5 hover:bg-white/10 transition rounded-xl px-4 py-3 flex items-center gap-2">
            <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4 text-ttt-orange flex-shrink-0" />
            <span class="text-white">Gérer les cookies sur <span class="text-white">Safari</span></span>
          </a>
          <a href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge" target="_blank" rel="noopener"
             class="bg-white/5 hover:bg-white/10 transition rounded-xl px-4 py-3 flex items-center gap-2">
            <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4 text-ttt-orange flex-shrink-0" />
            <span class="text-white">Gérer les cookies sur <span class="text-white">Edge</span></span>
          </a>
        </div>
      </section>

      <!-- Section : contact -->
      <section>
        <h2 class="text-xl font-bold text-ttt-orange mb-1">Contact &amp; droits</h2>
        <UDivider class="mb-4" />
        <p class="mb-3">
          Pour toute question relative à l'utilisation de vos données personnelles ou à cette politique
          de cookies, vous pouvez contacter notre délégué à la protection des données :
        </p>
        <div class="bg-white/5 rounded-xl p-4 space-y-1 text-sm">
          <p class="text-white font-medium">Thé Tip Top — DPO</p>
          <p>📍 18 rue Léon Frot, 75011 Paris</p>
          <p>✉️ <a href="mailto:webmaster@thetiptop.fr" class="text-ttt-orange hover:underline">webmaster@thetiptop.fr</a></p>
        </div>
        <p class="mt-3 text-sm text-white/80">
          Vous pouvez également introduire une réclamation auprès de la
          <a href="https://www.cnil.fr" target="_blank" rel="noopener" class="text-ttt-orange hover:underline">CNIL</a>
          si vous estimez que le traitement de vos données ne respecte pas la réglementation en vigueur.
        </p>
      </section>

      <!-- Section : évolution -->
      <section>
        <h2 class="text-xl font-bold text-ttt-orange mb-1">Évolution de la présente politique</h2>
        <UDivider class="mb-4" />
        <p>
          Thé Tip Top se réserve le droit de modifier cette politique de cookies à tout moment, notamment
          pour se conformer à de nouvelles obligations légales ou pour refléter des changements dans notre
          utilisation des cookies. La version en vigueur est celle accessible sur le site à la date de
          votre connexion.
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