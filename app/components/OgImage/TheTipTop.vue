<script setup lang="ts">
// On définit les props pour pouvoir changer le texte par page si besoin
withDefaults(defineProps<{
  title?: string
  description?: string
}>(), {
  title: 'Grand jeu concours Thé Tip Top Nice - Gagnez 1 an de thé bio premium',
  description: 'Célébrez l\’ouverture de notre 10e boutique à Nice ! Participez au jeu concours Thé Tip Top, gagnez des cadeaux exclusifs allant de l\’infuseur à un an de thés bio. Participation 100% gagnante.'
})
</script>

<template>
  <div class="h-full w-full flex flex-col items-center justify-center bg-[#0F0F0F] text-white border-[12px] border-[#DD6835]">
    <img src="/images/the_tip_top_logo_header.svg" width="300" class="mb-8" />

    <h1 class="text-7xl font-black text-center px-20">
      {{ title }}
    </h1>

    <p class="text-3xl text-[#DD6835] mt-5 font-bold">
      {{ description }}
    </p>

    <div class="absolute bottom-10 right-10 text-xl opacity-50">
      the-tip-top.jonathanlore.fr
    </div>
  </div>
</template>