<script setup lang="ts">
 import { ref } from 'vue'

 interface FAQItem {
   question: string
   answer: string
 }

 const faqs: FAQItem[] = [
   {
     question: "Comment se déroule le tirage au sort ?",
     answer: "Le tirage au sort est effectué de manière automatique via notre algorithme certifié à l'issue du jeu concours. " +
         "Dès la validation de votre code unique vous êtes inscrit pour le tirage au sort final. " +
         "Vous serez averti par email si vous avez gagné le gros lot mis en jeu (un an de thé bio premium d’une valeur de 360€)."
   },
   {
     question: "Comment retirer mon lot en boutique ?",
     answer: "Une fois votre gain confirmé, présentez-vous dans votre boutique Thé Tip Top la plus proche avec votre ticket de caisse original contenant le code unique. Vous bénéficiez de 30 jours supplémentaires, à l'issue du jeu concours, pour récupérer votre lot."
   },
   {
     question: "Suis-je assuré de gagner quelque chose ?",
     answer: "Oui ! 100% des codes sont gagnants. Les lots sont repartis via 500 000 codes selon les probabilités suivantes : 60% des tickets offrent un infuseur à thé, 20% des tickets offrent une boite de 100g d’un thé détox ou d’infusion, 10% des tickets offrent une boite de 100g d’un thé signature, 6% des tickets offrent un coffret découverte d’une valeur de 39€, 4% des tickets offrent un coffret découverte d’une valeur de 69€."
   },
   {
     question: "Que faites vous de mes données personnelles ?",
     answer: "Vos données sont uniquement utilisées pour la gestion du jeu concours et ne sont jamais revendues. Elles sont conservées de manière sécurisée conformément au RGPD."
   }
 ]
 const openIndex = ref<number | null>(null)

 const toggleFaq = (index: number) => {
   openIndex.value = openIndex.value === index ? null : index
 }
</script>

<template>
  <div class="max-w-[69rem] mx-auto w-full flex flex-col space-y-4 px-4 pb-8">
    <div v-for="(faq, index) in faqs" :key="index" class="border-b border-ttt-white/80 transition-all">
      <button @click="toggleFaq(index)" class="w-full flex items-center justify-between py-6 text-left group">
        <span class="text-lg text-ttt-white tracking-wide group-hover:font-bold transition-colors">
          {{ faq.question }}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 transform transition-transform duration-300 text-ttt-orange" :class="{ 'rotate-180': openIndex === index }" fill="none" viewBox="0 0 24 24" stroke="#fff">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div class="overflow-hidden transition-all duration-300 ease-in-out" :style="{ maxHeight: openIndex === index ? '200px' : '0px' }">
        <div class="pb-6 text-ttt-white leading-relaxed italic text-justify">
          {{ faq.answer }}
        </div>
      </div>
    </div>
  </div>
</template>