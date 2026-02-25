<script setup lang="ts">
import Disclaimer from "~/components/Disclaimer.vue";

useSeoPage({
  title: 'Règlement du jeu-concours Thé Tip Top 2025',
  description: 'Consultez le règlement officiel du jeu-concours Thé Tip Top 2025 : conditions de participation, répartition des dotations, tirage au sort final. 100% des codes sont gagnants.',
})

const prizes = [
  { label: 'Infuseur à thé', percent: 60, color: 'text-amber-300' },
  { label: 'Boîte 100g thé détox / infusion', percent: 20, color: 'text-ttt-orange' },
  { label: 'Boîte 100g thé signature', percent: 10, color: 'text-amber-500' },
  { label: 'Coffret découverte (39 €)', percent: 6, color: 'text-orange-300' },
  { label: 'Coffret découverte (69 €)', percent: 4, color: 'text-yellow-400' },
]
</script>

<template>
  <div class="min-h-screen bg-gradient-ttt-dark text-white">
    <!-- Hero -->
    <section class="relative py-16 px-4 border-b border-white/10">
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-sm uppercase tracking-widest text-ttt-orange mb-3 font-medium">Jeu-concours 2026</p>
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">Règlement du jeu</h1>
        <p class="text-white max-w-xl mx-auto text-sm">
          Règles complètes du jeu-concours organisé à l'occasion de l'ouverture de la 10<sup>e</sup> boutique
          Thé Tip Top à Nice. 100&nbsp;% des codes sont gagnants.
        </p>
      </div>
    </section>

    <!-- Content -->
    <div class="cgu-cookies-legals-content">

      <!-- Disclaimer -->
      <Disclaimer/>

      <!-- Section 1 : Organisateur -->
      <section>
        <h2 class="text-xl font-bold text-ttt-orange mb-1">Article 1 — Organisateur</h2>
        <UDivider class="mb-4" />
        <p class="mb-3">
          Le jeu-concours est organisé par la société <span class="text-white font-medium">Thé Tip Top</span>,
          société anonyme au capital de 150 000 €, immatriculée sous le numéro 341 123 321 au RCS de Paris,
          dont le siège social est situé au 18 rue Léon Frot, 75011 Paris.
        </p>
        <p>
          Il est organisé à l'occasion de l'ouverture de la 10<sup>e</sup> boutique de la marque, située à Nice.
        </p>
      </section>

      <!-- Section 2 : Conditions de participation -->
      <section>
        <h2 class="text-xl font-bold text-ttt-orange mb-1">Article 2 — Conditions de participation</h2>
        <UDivider class="mb-4" />
        <p class="mb-3">
          Le jeu est ouvert à toute personne physique <span class="text-white">majeure</span>, résidant en
          France métropolitaine (Corse incluse), ayant effectué un achat d'un montant minimum de
          <span class="text-white font-medium">49 € TTC</span> dans une boutique Thé Tip Top participante
          ou sur le site de vente en ligne, et disposant du ticket de caisse ou facture correspondant.
        </p>
        <p class="mb-3">
          L'inscription est limitée à <span class="text-white">une seule par personne</span> (même nom,
          prénom et adresse e-mail). La participation est gratuite, hors coûts éventuels de connexion internet.
        </p>
        <p>
          Sont exclus de la participation : les employés et membres de la famille des employés de Thé Tip Top,
          ainsi que toute personne ayant utilisé des outils automatisés pour générer des participations.
        </p>
      </section>

      <!-- Section 3 : Inscription -->
      <section>
        <h2 class="text-xl font-bold text-ttt-orange mb-1">Article 3 — Modalités d'inscription</h2>
        <UDivider class="mb-4" />
        <p class="mb-4">Pour participer, l'utilisateur doit :</p>
        <ol class="space-y-2 list-none">
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-6 h-6 rounded-full bg-ttt-orange/20 text-ttt-orange text-xs flex items-center justify-center font-bold">1</span>
            <span>Se connecter sur <span class="text-white">www.the-tip-top.jonathanlore.fr</span></span>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-6 h-6 rounded-full bg-ttt-orange/20 text-ttt-orange text-xs flex items-center justify-center font-bold">2</span>
            <span>Créer un compte (formulaire classique, Google ou Facebook) avec une adresse e-mail valide</span>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-6 h-6 rounded-full bg-ttt-orange/20 text-ttt-orange text-xs flex items-center justify-center font-bold">3</span>
            <span>Saisir le ou les codes figurant sur ses tickets de caisse</span>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-6 h-6 rounded-full bg-ttt-orange/20 text-ttt-orange text-xs flex items-center justify-center font-bold">4</span>
            <span>Découvrir instantanément le gain associé au code</span>
          </li>
        </ol>
      </section>

      <!-- Section 4 : Codes -->
      <section>
        <h2 class="text-xl font-bold text-ttt-orange mb-1">Article 4 — Codes de participation</h2>
        <UDivider class="mb-4" />
        <p class="mb-3">
          Chaque ticket de caisse conforme comporte un code unique composé de
          <span class="text-white font-medium">10 caractères alphanumériques</span>. Un même participant peut
          saisir plusieurs codes, dans la limite des <span class="text-white">500 000 codes</span> mis en circulation.
        </p>
        <p class="mb-3">
          Les codes sont générés avant le lancement du jeu et associés de manière aléatoire aux gains.
          Aucun code ne peut être modifié ni échangé une fois généré. Un code ne peut être utilisé
          <span class="text-white">qu'une seule fois</span>.
        </p>
        <p>
          Chaque tentative de saisie est enregistrée (horodatage, adresse IP, compte utilisateur) à des fins
          de traçabilité et de lutte contre la fraude.
        </p>
      </section>

      <!-- Section 5 : Dotations -->
      <section>
        <h2 class="text-xl font-bold text-ttt-orange mb-1">Article 5 — Dotations</h2>
        <UDivider class="mb-4" />
        <p class="mb-4">
          <span class="text-white font-medium">100&nbsp;% des codes sont gagnants.</span>
          La répartition des gains est la suivante :
        </p>
        <div class="space-y-3">
          <div
              v-for="prize in prizes"
              :key="prize.label"
              class="flex items-center gap-4 bg-white/5 rounded-xl px-4 py-3"
          >
            <span :class="[prize.color, 'text-2xl font-black w-14 flex-shrink-0']">{{ prize.percent }}&nbsp;%</span>
            <span class="text-white">{{ prize.label }}</span>
          </div>
        </div>
        <p class="mt-4 text-sm text-white/80">
          Un tirage au sort final sera effectué parmi tous les participants ayant saisi au moins un code valide,
          pour désigner le gagnant d'<span class="text-white">un an de thé (valeur 360 €)</span>.
          Chaque participant dispose d'une seule chance au tirage, quel que soit le nombre de codes saisis.
        </p>
      </section>

      <!-- Section 6 : Durée -->
      <section>
        <h2 class="text-xl font-bold text-ttt-orange mb-1">Article 6 — Durée du jeu</h2>
        <UDivider class="mb-4" />
        <p class="mb-3">
          Le jeu est ouvert pendant une période de <span class="text-white font-medium">30 jours</span>.
          Les participants disposent ensuite de <span class="text-white font-medium">30 jours supplémentaires</span>
          à compter de la fin du jeu pour saisir leurs codes.
        </p>
        <p>Au-delà de cette période, les codes non utilisés seront considérés comme expirés.</p>
      </section>

      <!-- Section 7 : Retrait des gains -->
      <section>
        <h2 class="text-xl font-bold text-ttt-orange mb-1">Article 7 — Retrait des gains</h2>
        <UDivider class="mb-4" />
        <p class="mb-3">Les gains peuvent être retirés de deux manières :</p>
        <div class="grid sm:grid-cols-2 gap-4">
          <div class="bg-white/5 rounded-xl p-4">
            <p class="text-white font-semibold mb-1">🏪 En boutique</p>
            <p class="text-sm text-white/80">Sur présentation du code gagnant et d'une pièce d'identité valide.</p>
          </div>
          <div class="bg-white/5 rounded-xl p-4">
            <p class="text-white font-semibold mb-1">💻 En ligne</p>
            <p class="text-sm text-white/80">Selon les modalités précisées après la révélation du gain sur le site.</p>
          </div>
        </div>
        <p class="mt-4 text-sm text-white/80">
          Une fois le gain remis ou expédié, le statut du code est mis à jour dans la base de données,
          rendant toute réutilisation impossible.
        </p>
      </section>

      <!-- Section 8 : Tirage au sort -->
      <section>
        <h2 class="text-xl font-bold text-ttt-orange mb-1">Article 8 — Tirage au sort final</h2>
        <UDivider class="mb-4" />
        <p class="mb-3">
          À l'issue du jeu-concours, un tirage au sort sera effectué parmi l'ensemble des participants
          ayant saisi au moins un code valide sur le site, afin de désigner le gagnant du lot final :
          <span class="text-white font-medium">un an de thé d'une valeur de 360 € TTC</span>.
        </p>
        <p>
          Le tirage au sort sera réalisé sous le contrôle de
          <span class="text-white">Maître Arnaud Rick</span>, huissier de justice, garant de la régularité
          de l'opération.
        </p>
      </section>

      <!-- Section 9 : Fraude -->
      <section>
        <h2 class="text-xl font-bold text-ttt-orange mb-1">Article 9 — Fraude et abus</h2>
        <UDivider class="mb-4" />
        <p class="mb-3">
          Tout comportement frauduleux entraînera l'exclusion définitive du participant et pourra faire l'objet
          de poursuites judiciaires. Sont notamment interdits :
        </p>
        <ul class="space-y-2 text-sm text-white">
          <li class="flex gap-2"><span class="text-red-400 flex-shrink-0">✕</span> L'utilisation de bots ou scripts automatisés</li>
          <li class="flex gap-2"><span class="text-red-400 flex-shrink-0">✕</span> La transmission ou revente de codes à des tiers</li>
          <li class="flex gap-2"><span class="text-red-400 flex-shrink-0">✕</span> Toute tentative d'altération du fonctionnement du site</li>
          <li class="flex gap-2"><span class="text-red-400 flex-shrink-0">✕</span> La création de comptes multiples</li>
          <li class="flex gap-2"><span class="text-red-400 flex-shrink-0">✕</span> L'accès non autorisé aux données d'autres utilisateurs</li>
        </ul>
      </section>

      <!-- Section 10 : Données personnelles -->
      <section>
        <h2 class="text-xl font-bold text-ttt-orange mb-1">Article 10 — Données personnelles</h2>
        <UDivider class="mb-4" />
        <p class="mb-3">
          Les données collectées lors de l'inscription et de la participation sont traitées conformément au
          <span class="text-white">RGPD</span> et à la politique de confidentialité de Thé Tip Top.
          Elles sont utilisées exclusivement dans le cadre du jeu-concours.
        </p>
        <p>
          Conformément à la loi, vous disposez d'un droit d'accès, de rectification, d'opposition et de
          suppression de vos données en écrivant à :
          <a href="mailto:webmaster@thetiptop.fr" class="text-ttt-orange hover:underline">webmaster@thetiptop.fr</a>
        </p>
      </section>

      <!-- Section 11 : Droit applicable -->
      <section>
        <h2 class="text-xl font-bold text-ttt-orange mb-1">Article 11 — Droit applicable</h2>
        <UDivider class="mb-4" />
        <p>
          Le présent règlement est soumis au droit français. En cas de litige, et après tentative de résolution
          amiable, seuls les tribunaux français seront compétents.
        </p>
      </section>

      <!-- Nav liens -->
      <div class="pt-6 border-t border-white/10 flex flex-wrap gap-4 text-sm">
        <NuxtLink to="/mentions-legales" class="text-ttt-orange hover:underline">→ Mentions légales</NuxtLink>
        <NuxtLink to="/politique-de-cookies" class="text-ttt-orange hover:underline">→ Politique de cookies</NuxtLink>
      </div>
    </div>
  </div>
</template>