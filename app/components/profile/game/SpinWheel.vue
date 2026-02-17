<template>
  <div class="wheel-wrapper">
    <!-- Calque 1 : structure (contour + pied) — derrière tout -->
    <img class="wheel-layer wheel-structure" src="/images/wheel/structure.webp" alt="" aria-hidden="true" />

    <!-- Calque 2 : roue rotative -->
    <img class="wheel-layer wheel-background" src="/images/wheel/background.webp" alt="" aria-hidden="true" />

    <!-- Calque 3 : flèche — devant tout -->
    <img class="wheel-layer wheel-arrow" src="/images/wheel/arrow.webp" alt="" aria-hidden="true" />
  </div>
</template>

<style scoped lang="scss" src="./SpinWheel.scss" />