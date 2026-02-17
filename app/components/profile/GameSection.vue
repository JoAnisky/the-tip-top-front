<script setup lang="ts">

import SpinWheel from "~/components/profile/game/SpinWheel.vue";
</script>

<template>
  <section id="game" class="relative overflow-hidden bg-gradient-ttt-dark">
    <div class="ttt-container">
      <h2 class="text-4xl font-bold text-center mb-2">Saisissez votre code</h2>
      <div class="flex subtitle relative z-10">
        <p class="mb-8">
          Et lancez la roue pour découvrir ce que vous avez gagné !
        </p>
      </div>
      <SpinWheel/>
    </div>
    <img src="/images/leaf.png" alt="" aria-hidden="true" class="absolute bottom-0 right-0 w-48 pointer-events-none"/>
  </section>
</template>