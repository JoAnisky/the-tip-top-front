<script setup lang="ts">
import ContactForm from "~/components/ContactForm.vue";

definePageMeta({ layout: 'default' })
useSeoPage({
  title: 'Contactez l\'équipe du jeu-concours Thé Tip Top ',
  description: 'Une question sur le jeu-concours Thé Tip Top, votre compte ou vos gains ? Contactez notre équipe par e-mail, nous répondons dans les plus brefs délais.',
})

</script>

<template>
  <div class="min-h-full text-white">
    <!-- Hero -->
    <section class="relative py-16 pt-4 pb-1 border-b border-white/10">
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-sm uppercase tracking-widest text-ttt-orange mb-3 font-medium">Une question ?</p>
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">Nous contacter</h1>
        <p class="text-white text-lg max-w-xl mx-auto">
          Pour toute question relative au jeu-concours, à votre compte ou à vos gains,
          notre équipe est disponible par e-mail.
        </p>
      </div>
    </section>

    <!-- Formulaire -->
    <ContactForm/>
  </div>
</template>