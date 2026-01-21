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
  <div class="grid grid-cols-1 md:grid-cols-3 gap-[8rem] w-full px-4">
    <div v-for="step in steps" :key="step.stepId" class="flex flex-col items-center">

      <div class="bg-white rounded-[40px] shadow-xl flex flex-col items-center pb-10 w-full max-w-[320px]">

        <div class="w-full h-[380px] overflow-hidden rounded-t-[40px]">
          <img :src="step.image"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 step-image"
              alt=""
              aria-hidden="true"
          />
        </div>

        <div class="relative z-10 -mt-6 w-[110%] bg-[#1A1A1A] py-4 px-6 flex items-center shadow-lg justify-center">
          <div class="bg-white text-[#1A1A1A] w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mr-4 shrink-0">
            {{ step.stepId }}
          </div>
          <h3 class="text-white font-bold uppercase tracking-widest text-lg leading-none">
            {{ step.name }}
          </h3>
        </div>

        <div class="mt-8 px-8 text-center">
          <p class="text-[#1A1A1A] text-xl leading-relaxed font-medium">
            {{ step.description }}
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
  .step-image {
    clip-path: ellipse(65% 75% at 50% 15%);
  }
</style>