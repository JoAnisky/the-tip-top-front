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

  <section class="bg-gradient-ttt-dark-reverse py-10 relative">
    <div class="ttt-container">
      <div class="flex flex-row items-baseline gap-4">
        <h2 class="leading-7 mb-0">Découvrez l’univers</h2>
        <img src="/images/the_tip_top_logo_header.svg" width="183" height="36" class="object-contain h-[2.6em] w-auto self-end" alt="Logo Thé Tip Top">
      </div>
      <div>
        <p class="italic my-10">En participant, vous rejoignez une communauté d’amateurs de thé bio de qualité.</p>
      </div>
      <div class="flex flex-wrap justify-center gap-12 my-10">
        <img src="/images/agriculture-bio.webp" alt="Logo Agriculture bio France" width="41" height="49"/>
        <img src="/images/europe-bio.webp" alt="Logo Europe bio France" width="87" height="58"/>
        <img src="/images/rse.webp" alt="Logo responsabilité sociétale des entreprises" width="58" height="59"/>
      </div>
      <div class="flex flex-wrap justify-center gap-8 mb-10 w-[60vw] pb-[12.5rem]">
        <p class="text-center">Explorez nos collections de thés verts, noirs, rooibos et infusions, tous élaborés en France avec passion et respect des traditions artisanales. Nous sommes fiers de vous offrir des produits sains, éthiques, respectueux de l’environnement et délicieusement parfumés.</p>
      </div>
    </div>
    <img src="/images/univers-ttt-background.webp" alt="" aria-hidden="true" class="absolute bottom-0 right-0 w-full pointer-events-none" width="1441" height="164"/>
  </section>
  <section id="faq" class="bg-ttt-green-light py-10">
    <div class="ttt-container">
      <h2>FAQ</h2>
      <Faqlist/>
    </div>
  </section>
</template>
