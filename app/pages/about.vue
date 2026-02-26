<script setup lang="ts">
definePageMeta({ layout: 'default' })

useSeoPage({
  title: 'Qui sommes-nous ? Thés bios et artisanaux français',
  description: 'Découvrez l\'histoire de Thé Tip Top, marque française de thés bios et artisanaux. Qualité exceptionnelle et savoir-faire artisanal depuis plus de 20 ans.',
})
</script>

<template>
  <div class="min-h-screen bg-gradient-ttt-dark text-white">
    <!-- Hero -->
    <section class="relative py-16 px-4 border-b border-white/10">
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-xl uppercase tracking-widest text-ttt-green-lighter mb-3 font-medium">Notre histoire</p>
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
          Thé Tip Top : notre histoire, notre passion pour le thé bio et artisanal
        </h1>
        <p class="text-white text-lg mx-auto italic">
          Bienvenue chez Thé Tip Top, une aventure née d'une passion profonde pour le thé et d'un engagement
          inébranlable envers la nature et l'artisanat. Depuis plus de 20 ans, nous nous dédions à créer des
          thés bios et artisanaux d'exception, pour vous offrir une expérience gustative unique et authentique
          à chaque tasse.
        </p>
      </div>
    </section>

    <!-- Content -->
    <div class="cgu-cookies-legals-content">

      <!-- Section 1 -->
      <section>
        <h2 class="text-xl font-bold text-ttt-green-lighter mb-1">L'origine de Thé Tip Top : en quête de sens et de saveurs</h2>
        <UDivider class="mb-4" />
        <p class="mb-3">
          Thé Tip Top n'est pas qu'une simple marque de thé : c'est le fruit d'une quête. Animés par le désir
          de revenir à l'essentiel, nous avons parcouru le monde pour sélectionner les meilleures feuilles de
          thé, cultivées dans le respect de l'environnement.
        </p>
        <p>
          C'est ainsi que nous avons développé notre concept : des thés faits main, assemblés avec soin en
          France, pour garantir une qualité et une pureté inégalées. Chaque mélange raconte une histoire,
          celle de terroirs riches et d'un savoir-faire ancestral.
        </p>
        <p class="mt-3">
          Aujourd'hui, Thé Tip Top propose plus de 50 références de thés verts, noirs, rooibos et infusions,
          tous assemblés à la main dans notre atelier français. Chaque recette est le résultat de mois de
          recherche et de dégustation, pour atteindre l'équilibre aromatique parfait.
        </p>
      </section>

      <!-- Section 2 -->
      <section>
        <h2 class="text-xl font-bold text-ttt-green-lighter mb-1">Notre engagement : le bio, l'artisanal et le respect</h2>
        <UDivider class="mb-4" />
        <p class="mb-4">Chez Thé Tip Top, nos valeurs sont au cœur de notre démarche :</p>
        <div class="space-y-4">
          <div class="bg-white/5 rounded-xl p-4 flex gap-4">
            <span class="text-2xl flex-shrink-0">🌿</span>
            <div>
              <p class="text-white font-semibold mb-1">Le thé bio certifié</p>
              <p class="text-white/80 text-sm">Tous nos thés sont issus de l'agriculture biologique, sans pesticide ni produits chimiques. Nous nous engageons pour votre santé et celle de la planète.</p>
            </div>
          </div>
          <div class="bg-white/5 rounded-xl p-4 flex gap-4">
            <span class="text-2xl flex-shrink-0">🤲</span>
            <div>
              <p class="text-white font-semibold mb-1">Le fait main</p>
              <p class="text-white/80 text-sm">Nous privilégions les méthodes artisanales pour la préparation de nos mélanges. Ce processus minutieux garantit des arômes intenses et un goût d'une rare finesse.</p>
            </div>
          </div>
          <div class="bg-white/5 rounded-xl p-4 flex gap-4">
            <span class="text-2xl flex-shrink-0">⚖️</span>
            <div>
              <p class="text-white font-semibold mb-1">L'éthique et la durabilité</p>
              <p class="text-white/80 text-sm">Nous travaillons en étroite collaboration avec des producteurs qui partagent nos valeurs de respect de la terre et des hommes, assurant une traçabilité et une équité à chaque étape.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 3 -->
      <section>
        <h2 class="text-xl font-bold text-ttt-green-lighter mb-1">Une communauté de passionnés du thé</h2>
        <UDivider class="mb-4" />
        <p class="mb-3">
          Au fil des années, Thé Tip Top est devenue une communauté d'amateurs éclairés. Que ce soit dans nos
          boutiques — dont notre toute nouvelle boutique de Nice — ou en ligne, nous aimons partager notre
          expertise et vous guider dans le choix de votre thé bio idéal.
        </p>
        <p class="mt-3">
          Notre réseau compte aujourd'hui 10 boutiques en France, de Paris à Nice, animées par des conseillers
          passionnés formés à l'art du thé. En boutique comme en ligne, nous mettons un point d'honneur à vous
          accompagner dans la découverte de saveurs qui vous ressemblent.
        </p>
        <p>
          Venez découvrir nos collections, échanger avec nos experts et faire partie de l'aventure Thé Tip Top.
        </p>
      </section>

      <!-- CTA jeu-concours -->
      <div class="pt-6 border-t border-white/10 flex flex-col items-center gap-4 text-center">
        <h3 class="text-xl font-bold text-ttt-green-lighter mb-1">À l'occasion de l'ouverture de notre 10e boutique à Nice, participez à notre jeu-concours 100% gagnant !</h3>
        <PlayBtn/>
        <NuxtLink to="/contact" class="hover:underline text-sm">→ Nous contacter</NuxtLink>
      </div>

    </div>
  </div>
</template>

<style scoped>
section {
  padding: 1rem 0 !important;
}
</style>