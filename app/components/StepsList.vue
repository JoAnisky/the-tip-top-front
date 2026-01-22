<script setup lang="ts">
  interface Step {
    stepId: number;
    name: string;
    image: string;
    description: string;
  }

  const steps: Step[] = [
    {
      stepId : 1,
      name: "rdv en boutique",
      image: "/images/steps/rdv-en-boutique.webp",
      description: "On vous attend dans votre boutique Thé Tip Top favorite"
    },
    {
      stepId: 2,
      name: "Effectuez un achat",
      image:  "/images/steps/effectuez-un-achat.webp",
      description: "49€ minimum = un code unique sur votre ticket de caisse."
    },
    {
      stepId: 3,
      name: "Tentez votre chance",
      image: "/images/steps/tentez-votre-chance.webp",
      description: "Participez avec le code remis sur votre ticket d’achat"
    },
  ];
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-[4rem] xl:gap-[8rem] w-full px-4 max-w-7xl mx-auto">
    <div v-for="step in steps" :key="step.stepId" class="flex flex-col items-center w-full">

      <div class="relative bg-white rounded-[24px] lg:rounded-[40px] shadow-xl flex flex-row lg:flex-col items-stretch w-full max-w-[650px] lg:max-w-[380px] overflow-visible lg:pb-10">

        <div class="flex-1 flex flex-col pt-14 md:pt-12 pb-4 md:pb-6 px-4 md:px-6 lg:pt-0 lg:p-0 order-1 lg:order-2 w-full">

          <div class="absolute z-20 lg:relative top-0 -left-3 lg:top-0 lg:left-0 lg:z-10 lg:-mt-8 w-auto min-w-[180px] md:min-w-[220px] lg:w-[112%] lg:-ml-[6%] bg-[#1A1A1A] py-2 lg:py-4 px-4 lg:px-6 shadow-xl flex items-center lg:justify-center">
            <div class="bg-white text-[#1A1A1A] w-7 h-7 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-bold text-base lg:text-xl mr-3 lg:mr-4 shrink-0">
              {{ step.stepId }}
            </div>
            <h3 class="text-white font-bold uppercase tracking-widest text-xs sm:text-sm lg:text-lg leading-tight whitespace-nowrap">
              {{ step.name }}
            </h3>
          </div>

          <div class="mt-4 lg:mt-8 lg:px-8 text-left lg:text-center">
            <p class="text-[#1A1A1A] text-base md:text-lg lg:text-xl leading-snug md:leading-relaxed font-medium">
              {{ step.description }}
            </p>
          </div>
        </div>

        <div class="w-[35%] md:w-[30%] lg:w-full overflow-hidden order-2 lg:order-1 flex-shrink-0 rounded-r-[24px] lg:rounded-t-[40px] lg:rounded-r-none">
          <img :src="step.image"
               class="w-full h-full object-cover step-image"
               alt=""
               aria-hidden="true"
          />
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

/* courbe concave vers la gauche pour le mobile */
.step-image {
  clip-path: ellipse(100% 120% at 100% 50%);
}

/* courbe horizontale pour desktop */
@media (min-width: 1024px) {
  .step-image {
    clip-path: ellipse(65% 75% at 50% 15%);
  }
}
</style>