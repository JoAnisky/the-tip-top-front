<script setup lang="ts">
definePageMeta({ layout: 'default' })
useSeoPage({
  title: 'Contactez l\'équipe du jeu-concours Thé Tip Top ',
  description: 'Une question sur le jeu-concours Thé Tip Top, votre compte ou vos gains ? Contactez notre équipe par e-mail, nous répondons dans les plus brefs délais.',
})
</script>

<template>
  <div class="h-full text-white">
    <!-- Hero -->
    <section class="relative py-16 px-4 border-b border-white/10">
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-sm uppercase tracking-widest text-ttt-orange mb-3 font-medium">Une question ?</p>
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">Nous contacter</h1>
        <p class="text-white/80 text-sm max-w-xl mx-auto">
          Pour toute question relative au jeu-concours, à votre compte ou à vos gains,
          notre équipe est disponible par e-mail.
        </p>
      </div>
    </section>

    <!-- Content -->
    <div class="max-w-3xl mx-auto px-4 py-16 pb-24 flex flex-col items-center text-center gap-6">
      <div class="bg-white/5 rounded-2xl px-8 py-10 w-full max-w-md flex flex-col items-center gap-4">
        <UIcon name="i-heroicons-envelope" class="w-10 h-10 text-ttt-orange" />
        <p class="text-white text-base">Écrivez-nous à</p>
        <a
            href="mailto:contact@jonathanlore.fr"
            class="text-ttt-orange text-xl font-semibold hover:underline break-all"
        >
          contact@jonathanlore.fr
        </a>
        <p class="text-white text-sm mt-2">
          Nous nous efforçons de répondre dans les plus brefs délais.
        </p>
      </div>
    </div>
  </div>
</template>