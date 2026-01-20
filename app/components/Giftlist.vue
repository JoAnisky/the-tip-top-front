<script setup lang="ts">
interface ImageSources {
  mobile: string;
  tablet: string;
  desktop: string;
}

interface Gift {
  name: string;
  images: ImageSources;
}

const gifts: Gift[] = [
  {
    name: "Infuseur à thé",
    image: "/images/gifts/infuseur-a-the.webp",
  },
  {
    name: "Boîte de 100g Thé détox ou infusion",
    image:  "/images/gifts/boite-the-ou-infusion.webp",
  },
  {
    name: "Boîte de 100g Thé signature",
    image: "/images/gifts/boite-the-signature.webp",
  },
  {
    name: "Coffret découverte (valeur de 39€ ou 69€)",
    image: "/images/gifts/coffret-decouverte.webp",
  },
];
</script>

<template>
  <div v-for="(gift, index) in gifts" :key="index" class="group flex flex-col items-center max-w-[280px]">
    <img :src="gift.image" :alt="gift.name" class="w-full h-auto object-contain transition-transform group-hover:scale-105" loading="lazy"/>
      <p class="mt-4 text-center text-xl group-hover:text-ttt-orange">
        {{ gift.name }}
      </p>
  </div>
</template>
