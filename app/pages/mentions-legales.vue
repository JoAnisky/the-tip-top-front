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
        <address class="bg-white/5 rounded-xl p-4 space-y-1 not-italic">
          <ul class="space-y-1 text-base">
            <li>📍 18 rue Léon Frot, 75011 Paris</li>
            <li>📞 01 43 72 25 88</li>
            <li>✉️ c.durand@thetiptop.fr</li>
          </ul>
        </address>
      </section>

      <!-- Section 2 -->
      <section>
        <h2 class="text-xl font-bold text-ttt-green-lighter mb-1">Directeur de la publication</h2>
        <UDivider class="mb-4" />
        <p class="mb-3">Clément <span class="text-white font-medium">DURAND</span>, en sa qualité de responsable publication.</p>
        <p class="text-white/80 text-sm">
          En tant que directeur de la publication, M. Durand est responsable du contenu éditorial diffusé
          sur ce site, conformément à la loi n° 82-652 du 29 juillet 1982 sur la communication audiovisuelle
          et à la loi pour la confiance dans l'économie numérique (LCEN) du 21 juin 2004.
        </p>
      </section>

      <!-- Section 3 -->
      <section>
        <h2 class="text-xl font-bold text-ttt-green-lighter mb-1">Hébergement</h2>
        <UDivider class="mb-4" />
        <h3 class="text-xl mb-3">Le site est hébergé par :</h3>
        <address class="bg-white/5 rounded-xl p-4 space-y-1 not-italic">
          <h3 class="text-xl text-white font-medium">Infomaniak Network SA</h3>
          <ul class="space-y-1 pt-2 text-base">
            <li>🌐 www.infomaniak.com</li>
            <li>📍 Rue Eugène Marziano 25, 1227 Les Acacias, Genève (Suisse)</li>
            <li>📞 +41 22 820 35 40</li>
          </ul>
        </address>
      </section>

      <!-- Section 4 -->
      <section>
        <h2 class="text-xl font-bold text-ttt-green-lighter mb-1">Conception et réalisation</h2>
        <UDivider class="mb-4" />
        <h3 class="text-xl mb-3">Réalisation du site internet :</h3>
        <address class="bg-white/5 rounded-xl p-4 space-y-1 not-italic">
          <h3 class="text-xl text-white font-medium">Agence Furious Duck</h3>
          <ul class="space-y-1 pt-2 text-base">
            <li>🌐 www.furiousduck.fr</li>
            <li>📍 42 rue Fictive, 25000 Besançon</li>
            <li>📞 03 81 00 12 34</li>
          </ul>
        </address>
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
        <address class="bg-white/5 rounded-xl p-4 space-y-1 mb-3 not-italic">
          <h3 class="text-xl text-white font-medium">Thé Tip Top — Service client</h3>
          <ul class="space-y-1 pt-2 text-base">
            <li>📍 18 rue Léon Frot, 75011 Paris</li>
            <li>✉️ webmaster@thetiptop.fr</li>
          </ul>
        </address>
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
      <div class="pt-6 border-t border-white/10 flex flex-col gap-4 items-center">
        <h3 class="text-lg font-bold text-ttt-green-lighter mb-1">Pour en savoir plus</h3>
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