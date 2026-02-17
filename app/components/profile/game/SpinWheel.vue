<script setup lang="ts">
import { uniqueCodeSchema } from "~/utils/unique-code-schema";
const loading = ref(false);
const isDisabled = ref(true);

const wheelImages = {
  structure: '/images/wheel/structure.webp',
  background: '/images/wheel/background.webp',
  arrow: '/images/wheel/arrow.webp',
  game: '/images/jeu-concours.webp',
} as const

const state = reactive({
  code: ''
})

</script>
<template>
  <div class="wheel-wrapper mt-6">
    <div class="absolute top-[-1rem] right-[-6rem] w-32 hidden md:block">
      <img :src="wheelImages.game" alt="Grand Jeu 100% gagnant" class="rotate-12" />
    </div>
    <!-- Calque 1 : structure (contour + pied) — derrière tout -->
    <img class="wheel-layer wheel-structure" :src="wheelImages.structure" alt="" aria-hidden="true" />

    <!-- Calque 2 : roue rotative -->
    <img class="wheel-layer wheel-background" :src="wheelImages.background" alt="" aria-hidden="true" />

    <!-- Calque 3 : flèche — devant tout -->
    <img class="wheel-layer wheel-arrow" :src="wheelImages.arrow" alt="" aria-hidden="true" />
  </div>
  <div class="form-container">
    <UForm :schema="uniqueCodeSchema" :state="state" class="space-y-6 !ttt-form-no-blue" @submit="onSubmit">
      <UFormGroup name="code">
        <template #label>
          <span class="ttt-form-label">
            Code sur votre ticket d’achat supérieur à 49€
          </span>
        </template>
        <UInput
            v-model="state.code"
            name="code"
            placeholder="Code unique à 10 caractères"
            size="xl"
            variant="none"
            class="ttt-input-dark"
        />
      </UFormGroup>

      <UButton
          type="submit"
          block
          size="xl"
          class="btn-primary"
          :ui="{ base: '!text-ttt-white font-bold uppercase', font: '!font-bold' }"
          :loading="loading"
          :disabled="isDisabled"
      >
        Lancer la roue
      </UButton>
    </UForm>
  </div>
</template>

<style scoped lang="scss" src="./SpinWheel.scss" />