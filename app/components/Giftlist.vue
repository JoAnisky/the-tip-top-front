<script setup lang="ts">
import { useGifts } from '~/composables/useGifts'
const { gifts } = useGifts()
</script>

<template>
  <div v-for="(gift, index) in gifts" :key="index" class="group flex flex-col items-center max-w-[280px]">
    <div class="relative transition-all duration-300 rounded-full group-hover:shadow-[0_0_30px_#fff]">
      <img :src="gift.image" alt="" class="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105" loading="lazy"/>
    </div>
    <p class="mt-4 text-center text-xl group-hover:text-ttt-orange">
      {{ gift.name }}
    </p>
  </div>
</template>
