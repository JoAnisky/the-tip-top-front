<script setup lang="ts">
  import LoginForm from "~/components/register/LoginForm.vue";
  import RegisterForm from "~/components/register/RegisterForm.vue";

  const isLogin = ref(true);

  const toggleForm = () => {
    isLogin.value = !isLogin.value;
  }
</script>

<template>
  <div class="min-h-full flex flex-col bg-ttt-dark-grey overflow-x-hidden">
    <div class="flex-1 flex flex-col items-center relative overflow-x-hidden w-full">
      <div class="text-center mb-[5.5rem] bg-gradient-ttt-dark-reverse-subtle w-full max-w-full pt-10">
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
          {{ isLogin ? 'Connectez-vous' : 'Rejoignez-nous' }} et tentez votre chance
        </h1>
        <p class="text-lg text-gray-300">
          L'univers Thé Tip Top vous ouvre ses portes pour un moment de bien-être unique.
        </p>
      </div>
      <div class="form-container w-full flex flex-col items-center justify-center">
        <Transition name="flip" mode="out-in">
          <LoginForm v-if="isLogin" @switchForm="toggleForm" />
          <RegisterForm v-else @switchForm="toggleForm" />
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animation Flip 3D */
.flip-enter-active,
.flip-leave-active {
  transition: all 0.25s ease-in-out;
  backface-visibility: hidden;
}

.flip-enter-from {
  transform: rotateY(90deg);
  opacity: 0;
}

.flip-leave-to {
  transform: rotateY(-90deg);
  opacity: 0;
}
</style>