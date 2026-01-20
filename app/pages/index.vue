<script setup lang="ts">

</script>

<template>
  <AppHero/>
  <section id="gift-list" class="gift-list relative overflow-hidden bg-gradient-ttt-dark py-10">
    <div class="ttt-container">
      <div class="flex">
        <h2>Fêtez l’ouverture de notre 10ᵉ boutique en remportant des lots exclusifs !</h2>
      </div>
      <div class="flex flex-wrap justify-center gap-8 mb-10">
        <Giftlist/>
      </div>
      <div class="flex subtitle">
        <p>Tentez de remporter ces cadeaux uniques et transformez votre expérience du thé.</p>
      </div>
    </div>
    <img src="/images/leaf.png" alt="" aria-hidden="true" class="absolute bottom-0 right-0 w-48 pointer-events-none"/>
  </section>

  <section id="howto" class="bg-ttt-green-light py-10">
    <div class="ttt-container">
      <div class="flex">
        <h2>Comment participer et gagner ? C’est simple !</h2>
      </div>
      <div class="flex subtitle">
        <p class="subtitle">La participation à notre jeu concours Thé Tip Top Nice est un jeu d’enfant</p>
      </div>
      <div class="flex flex-wrap justify-center gap-8 my-10">
        <StepsList/>
      </div>
      <PlayBtn/>
    </div>
  </section>
</template>
