<template>
  <header class="relative w-full py-4 lg:py-10 min-h-[400px] lg:min-h-[500px] flex items-center overflow-hidden">
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

    <div class="absolute inset-0 bg-black/60 z-0"></div>

    <div class="relative z-10 px-[var(--content-gutter)] w-full text-ttt-white">
      <div class="flex items-center justify-between max-w-6xl">
        <div class="max-w-4xl text-left">
          <h1 class="main-title mb-6">
            Grand jeu concours <br/> Thé Tip Top
          </h1>
          <p class="text-xl md:text-2xl font-lato leading-relaxed">
            Gagnez un an de thé bio premium d’une valeur de 360€ et de nombreux cadeaux !
          </p>

          <PlayBtn class="my-8"/>

          <p class="text-base max-w-xl">
            Pour fêter l’<strong>ouverture de notre 10ᵉ boutique Thé Tip Top à Nice</strong>,
            nous lançons un jeu concours unique où chaque participation est 100% gagnante !
          </p>
        </div>

        <div class="flex-shrink-0 hidden lg:block pb-12">
          <img
              src="/images/jeu-concours.webp"
              alt="Illustration jeu concours"
              class="w-[244px] h-auto drop-shadow-2xl animate-float"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}
</style>