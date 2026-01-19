<template>
  <header class="relative w-full py-20">
    <picture class="absolute inset-0">

    <source media="(min-width: 1024px)" srcset="/images/hero-bg-1920.webp">
      <source media="(min-width: 640px)" srcset="/images/hero-bg-1024.webp">
      <img
          src="/images/hero-bg-640.webp"
          alt=""
          class="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchpriority="high"
          aria-hidden="true"
      />
    </picture>
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/60 z-0"></div>

    <!-- Contenu -->
    <div class="relative z-10 px-[var(--site-gutter)] text-ttt-white">
      <h1 class="main-title">Grand jeu concours Thé Tip Top</h1>

      <p class="text-xl mb-8 max-w-2xl font-lato">
        Gagnez un an de thé bio premium d’une valeur de 360€ et de nombreux cadeaux !
      </p>

      <Play/>

      <p class="mt-12 text-sm opacity-80 max-w-xl">
        Pour fêter l’<strong>ouverture de notre 10<sup>e</sup> boutique Thé Tip Top à Nice</strong>,
        nous lançons un jeu concours unique où chaque participation est 100% gagnante !
      </p>
    </div>
  </header>

</template>
<script setup lang="ts">
</script>