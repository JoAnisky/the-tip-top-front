<script setup lang="ts">
useSeoMeta({
  titleTemplate: null, // bypass le "— Thé Tip Top" du nuxt.config
  title: 'Grand jeu concours Thé Tip Top Nice — Gagnez 1 an de thé bio',
  description: 'Célébrez l\'ouverture de notre 10e boutique à Nice ! Participez au jeu-concours Thé Tip Top, 100% gagnant. Gagnez infuseurs, boîtes de thé et coffrets exclusifs.',
  ogTitle: 'Grand jeu concours Thé Tip Top Nice — Gagnez 1 an de thé bio',
  ogDescription: 'Participez au jeu-concours Thé Tip Top, 100% gagnant. Infuseurs, thés bio et coffrets découverte à gagner.',
  ogUrl: 'https://the-tip-top.jonathanlore.fr/',
  robots: 'index, follow',
})
useHead({
  link: [{ rel: 'canonical', href: 'https://the-tip-top.jonathanlore.fr/' }],
})
</script>

<template>
  <AppHero/>
  <section id="gift-list" class="gift-list relative overflow-hidden bg-gradient-ttt-dark">
    <div class="ttt-container">
      <div class="flex">
        <h2>Fêtez l’ouverture de notre 10ᵉ boutique en remportant des lots exclusifs !</h2>
      </div>
      <div class="flex flex-wrap justify-center gap-8 mb-10 mt-5">
        <p class="text-white/80 text-center mb-6">
          À l'occasion de l'ouverture de notre 10ᵉ boutique à Nice, Thé Tip Top vous offre la chance
          de remporter l'un de nos lots : infuseur à thé, boîtes de thés bio, coffrets découverte ou
          encore un an de thé d'une valeur de 360 €. 100&nbsp;% des codes sont gagnants.
        </p>
        <Giftlist/>
      </div>
      <div class="flex subtitle relative z-10">
        <h3>Tentez de remporter ces cadeaux uniques et transformez votre expérience du thé.</h3>
      </div>
      <p class="text-white/80 text-center mt-4 pb-6">
        Chaque ticket de caisse d'un montant minimum de 49 € vous donne accès à un code unique.
        Saisissez-le sur notre site pour découvrir instantanément votre gain et rejoindre l'aventure
        Thé Tip Top.
      </p>
    </div>
    <img src="/images/leaf.png" alt="" aria-hidden="true" class="absolute bottom-0 right-0 w-48 pointer-events-none"/>
  </section>

  <section id="howto" class="bg-ttt-green-light">
    <div class="ttt-container p-0 pl-[0.6rem]">
      <div class="flex">
        <h2>Comment participer et gagner ? C’est simple !</h2>
      </div>
      <div class="flex subtitle">
        <h3>La participation à notre jeu concours Thé Tip Top Nice est un jeu d’enfant</h3>
      </div>
      <div class="flex flex-wrap justify-center gap-8 my-10">
        <StepsList/>
      </div>
      <p class="text-center mb-6">
        Créez votre compte, saisissez le code figurant sur votre ticket de caisse et découvrez
        instantanément votre gain. Rendez-vous ensuite en boutique ou suivez les instructions
        en ligne pour récupérer votre lot.
      </p>
      <PlayBtn/>
    </div>
  </section>

  <section class="bg-gradient-ttt-dark-reverse relative">
    <div class="ttt-container">
      <div class="flex flex-col lg:flex-row lg:items-baseline gap-4">
        <h2 class="leading-7 mb-0">Découvrez l’univers</h2>
        <img src="/images/the_tip_top_logo_header.svg" width="183" height="36" class="object-contain h-[2em] lg:h-[2.6em] w-auto self-center lg:self-end" alt="Logo Thé Tip Top">
      </div>
      <div>
        <h3 class="italic mt-5 lg:my-10 font-normal">En participant, vous rejoignez une communauté d’amateurs de thé bio de qualité.</h3>
      </div>
      <div class="flex flex-wrap justify-center gap-6 lg:gap-12 my-8 lg:my-10">
        <img src="/images/agriculture-bio.webp" alt="Logo Agriculture bio France" width="41" height="49"/>
        <img src="/images/europe-bio.webp" alt="Logo Europe bio France" width="87" height="58"/>
        <img src="/images/rse.webp" alt="Logo responsabilité sociétale des entreprises" width="58" height="59"/>
      </div>
      <div class="flex flex-wrap justify-center gap-8 mb-10 w-[80vw] lg:w-[60vw] pb-5 lg:pb-[12.5rem]">
        <p class="text-justify lg:text-center">Explorez nos collections de thés verts, noirs, rooibos et infusions, tous élaborés en France avec passion et respect des traditions artisanales. Nous sommes fiers de vous offrir des produits sains, éthiques, respectueux de l'environnement et délicieusement parfumés.</p>
        <p class="text-justify lg:text-center">
          Certifiés agriculture biologique et engagés dans une démarche RSE, nos thés sont sélectionnés
          avec soin auprès de producteurs partageant nos valeurs. Chaque infusion est une invitation à
          ralentir, savourer et prendre soin de vous — et de la planète.
        </p>
      </div>
    </div>
    <img src="/images/univers-ttt-background.webp" alt="" aria-hidden="true" class="absolute bottom-0 right-0 w-full pointer-events-none" width="1441" height="164"/>
  </section>
  <section class="bg-ttt-green-light">
    <div class="ttt-container">
      <h2>Le jeu-concours Thé Tip Top : 100% gagnant</h2>
      <p class="mt-4 text-center max-w-6xl mx-auto">
        Du 1er mars au 30 avril 2025, participez au grand jeu-concours organisé à l'occasion de
        l'ouverture de la 10ᵉ boutique Thé Tip Top à Nice. Chaque achat d'un montant minimum de
        49 € vous donne droit à un code unique de 10 caractères. Saisissez-le en ligne pour
        découvrir instantanément votre gain parmi nos 5 dotations exclusives.
      </p>
      <p class="mt-4 text-center max-w-6xl mx-auto">
        Un tirage au sort final désignera le grand gagnant d'un an de thé bio d'une valeur de
        360 €, supervisé par Maître Arnaud Rick, huissier de justice. Toutes les informations
        détaillées sont disponibles dans notre
        <NuxtLink to="/reglement" class="text-white font-bold underline">règlement du jeu</NuxtLink>.
      </p>
    </div>
  </section>
  <section id="faq" class="bg-ttt-green-light">
    <div class="ttt-container">
      <h2>FAQ</h2>
      <Faqlist/>
    </div>
  </section>
</template>
