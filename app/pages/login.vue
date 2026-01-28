<script setup lang="ts">
  import LoginForm from "~/components/register/LoginForm.vue";
</script>

<template>
  <div class="min-h-full flex flex-col bg-ttt-dark-grey overflow-x-hidden">
    <div class="flex-1 flex flex-col items-center relative overflow-x-hidden w-full">
      <div class="text-center mb-[5.5rem] bg-gradient-ttt-dark-reverse-subtle w-full max-w-full pt-10">
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Connectez vous et tentez votre chance
        </h1>
        <p class="text-lg text-gray-300">
          L'univers Thé Tip Top vous ouvre ses portes pour un moment de bien-être unique.
        </p>
      </div>
      <LoginForm />
    </div>
  </div>
</template>