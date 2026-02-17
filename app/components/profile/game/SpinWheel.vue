<script setup lang="ts">
const wheelImages = {
  structure: '/images/wheel/structure.webp',
  background: '/images/wheel/background.webp',
  arrow: '/images/wheel/arrow.webp',
} as const
</script>
<template>
  <div class="wheel-wrapper">
    <!-- Calque 1 : structure (contour + pied) — derrière tout -->
    <img class="wheel-layer wheel-structure" :src="wheelImages.structure" alt="" aria-hidden="true" />

    <!-- Calque 2 : roue rotative -->
    <img class="wheel-layer wheel-background" :src="wheelImages.background" alt="" aria-hidden="true" />

    <!-- Calque 3 : flèche — devant tout -->
    <img class="wheel-layer wheel-arrow" :src="wheelImages.arrow" alt="" aria-hidden="true" />
  </div>
</template>

<style scoped lang="scss" src="./SpinWheel.scss" />