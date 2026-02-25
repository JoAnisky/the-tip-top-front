<script setup lang="ts">
import Disclaimer from "~/components/Disclaimer.vue";

useSeoPage({
  title: 'Mentions légales du site Thé Tip Top',
  description: 'Mentions légales du jeu-concours Thé Tip Top : éditeur, directeur de publication, hébergeur Infomaniak, propriété intellectuelle et données personnelles CNIL.',
})
</script>

<template>
  <div class="min-h-screen bg-gradient-ttt-dark text-white">
    <!-- Hero -->
    <section class="relative py-16 px-4 border-b border-white/10">
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-xl uppercase tracking-widest text-ttt-green-lighter mb-3 font-medium">Informations légales</p>
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">Mentions légales</h1>
        <p class="text-white text-sm">Dernière mise à jour : janvier 2025</p>
      </div>
    </section>

    <!-- Content -->
    <div class="cgu-cookies-legals-content">

      <!-- Disclaimer -->
      <Disclaimer />

      <!-- Section 1 -->
      <section>
        <h2 class="text-xl font-bold text-ttt-green-lighter mb-1">Éditeur du site</h2>
        <UDivider class="mb-4" />
        <p class="mb-3">
          Vous êtes actuellement connecté au site du jeu concours
          <span class="text-white font-medium">www.the-tip-top.jonathanlore.fr</span>,
          édité par la société <span class="text-white font-medium">Thé Tip Top</span>, société anonyme au capital de
          <span class="text-white">150 000 €</span>, immatriculée sous le numéro
          <span class="text-white">341 123 321</span> au RCS de Paris.
        </p>
        <div class="bg-white/5 rounded-xl p-4 space-y-1 text-sm">
          <p>📍 18 rue Léon Frot, 75011 Paris</p>
          <p>📞 01 43 72 25 88</p>
          <p>✉️ c.durand@thetiptop.fr</p>
        </div>
      </section>

      <!-- Section 2 -->
      <section>
        <h2 class="text-xl font-bold text-ttt-green-lighter mb-1">Directeur de la publication</h2>
        <UDivider class="mb-4" />
        <p>Clément <span class="text-white font-medium">DURAND</span>, en sa qualité de responsable publication.</p>
      </section>

      <!-- Section 3 -->
      <section>
        <h2 class="text-xl font-bold text-ttt-green-lighter mb-1">Hébergement</h2>
        <UDivider class="mb-4" />
        <p class="mb-3">Le site est hébergé par :</p>
        <div class="bg-white/5 rounded-xl p-4 space-y-1 text-sm">
          <p class="text-white font-medium">Infomaniak Network SA</p>
          <p>🌐 www.infomaniak.com</p>
          <p>📍 Rue Eugène Marziano 25, 1227 Les Acacias, Genève (Suisse)</p>
          <p>📞 +41 22 820 35 40</p>
        </div>
      </section>

      <!-- Section 4 -->
      <section>
        <h2 class="text-xl font-bold text-ttt-green-lighter mb-1">Conception et réalisation</h2>
        <UDivider class="mb-4" />
        <div class="bg-white/5 rounded-xl p-4 space-y-1 text-sm">
          <p class="text-white font-medium">Agence Furious Duck</p>
          <p>🌐 www.furiousduck.fr</p>
          <p>📍 42 rue Fictive, 25000 Besançon</p>
          <p>📞 03 81 00 12 34</p>
        </div>
      </section>

      <!-- Section 5 -->
      <section>
        <h2 class="text-xl font-bold text-ttt-green-lighter mb-1">Responsabilité</h2>
        <UDivider class="mb-4" />
        <p class="mb-3">
          Bien que Thé Tip Top s'efforce de maintenir à jour et exactes les informations diffusées sur ce site,
          celles-ci sont fournies sans aucune garantie contractuelle. Thé Tip Top se réserve la faculté de modifier
          le contenu du site à sa discrétion et sans préavis.
        </p>
        <p>
          Thé Tip Top ne pourra être tenu responsable des préjudices directs ou indirects, de quelque nature que ce
          soit, découlant de l'accès, de l'utilisation ou d'une éventuelle impossibilité d'accès au site.
        </p>
      </section>

      <!-- Section 6 -->
      <section>
        <h2 class="text-xl font-bold text-ttt-green-lighter mb-1">Propriété intellectuelle</h2>
        <UDivider class="mb-4" />
        <p class="mb-3">
          L'intégralité de ce site, incluant chacun de ses composants, est une œuvre protégée par les lois françaises
          et internationales relatives au droit d'auteur et à la propriété intellectuelle.
        </p>
        <p>
          Toute exploitation commerciale, reproduction, représentation, utilisation, adaptation, modification,
          incorporation, traduction ou commercialisation du contenu de ce site est strictement interdite sans
          l'autorisation préalable de Thé Tip Top.
        </p>
      </section>

      <!-- Section 7 -->
      <section>
        <h2 class="text-xl font-bold text-ttt-green-lighter mb-1">Données personnelles</h2>
        <UDivider class="mb-4" />
        <p class="mb-3">
          Thé Tip Top est soucieux du respect de la vie privée et se conforme aux lois en vigueur concernant la
          protection des données personnelles. Vous bénéficiez d'un droit d'accès, de rectification, d'effacement
          et d'opposition.
        </p>
        <div class="bg-white/5 rounded-xl p-4 space-y-1 text-sm mb-3">
          <p class="text-white font-medium">Thé Tip Top — Service client</p>
          <p>📍 18 rue Léon Frot, 75011 Paris</p>
          <p>✉️ webmaster@thetiptop.fr</p>
        </div>
        <p class="text-sm text-gray-200">
          Déclaration CNIL : numéros <span class="text-white">1081234</span> et <span class="text-white">1084321</span>.
        </p>
      </section>

      <!-- Section 8 -->
      <section>
        <h2 class="text-xl font-bold text-ttt-green-lighter mb-1">Liens hypertextes &amp; cookies</h2>
        <UDivider class="mb-4" />
        <p class="mb-3">
          Toute création de liens hypertextes pointant vers ce site est soumise à l'autorisation écrite et préalable
          de Thé Tip Top, qui n'exerce aucun contrôle sur les sites tiers accessibles via des liens présents sur ce site.
        </p>
        <p>
          Le site utilise des cookies pour améliorer l'expérience utilisateur. Pour en savoir plus, consultez notre
          <NuxtLink to="/politique-de-cookies" class="text-ttt-orange hover:underline">politique de cookies</NuxtLink>.
        </p>
      </section>

      <!-- Section 9 -->
      <section>
        <h2 class="text-xl font-bold text-ttt-green-lighter mb-1">Droit applicable</h2>
        <UDivider class="mb-4" />
        <p>
          Le site étant régi par le droit français, les tribunaux français seront seuls compétents en cas de litige.
        </p>
      </section>

      <!-- Nav liens -->
      <div class="pt-6 border-t border-white/10 flex flex-wrap gap-4 text-sm">
        <NuxtLink to="/reglement" class="text-ttt-orange hover:underline">→ Consulter le règlement du jeu</NuxtLink>
        <NuxtLink to="/politique-de-cookies" class="text-ttt-orange hover:underline">→ Politique de cookies</NuxtLink>
      </div>
    </div>
  </div>
</template>
<style scoped>
section {
  padding: 1rem 0 !important;
}
</style>