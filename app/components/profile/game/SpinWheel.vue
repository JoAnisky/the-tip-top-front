<script setup lang="ts">
import WinModale from "~/components/modales/WinModale.vue";
import { uniqueCodeSchema } from "~/utils/unique-code-schema";

const { errorAnnouncer, onError } = useFormErrorAnnouncer()
// Annonce dédiée pour l'état de la roue (lecteurs d'écran)
const wheelAnnouncer = ref<HTMLElement | null>(null)

const { loading, isSpinning, hasError, errorMessage, isModalOpen, currentRotation, winResult, cooldownActive, onSubmit: submitCode } = useSpinWheel()

const state = reactive({ code: '' })

const wheelImages = {
  structure: '/images/wheel/structure.webp',
  background: '/images/wheel/background.webp',
  arrow: '/images/wheel/arrow.webp',
  game: '/images/jeu-concours.webp',
} as const

async function onSubmit() {
  await submitCode(state.code)
}

/**
 * Annonce des messages vocaux pour lecteurs d'écran
 * @param message
 */
function announceWheel(message: string) {
  if (wheelAnnouncer.value) {
    wheelAnnouncer.value.textContent = ''
    nextTick(() => {
      if (wheelAnnouncer.value) {
        wheelAnnouncer.value.textContent = message
      }
    })
  }
}

</script>

<template>
  <div class="relative flex justify-center mt-6">
    <!-- Zone erreurs formulaire -->
    <div ref="errorAnnouncer" aria-live="assertive" aria-atomic="true" class="sr-only"></div>

    <!-- Zone état roue — polite car pas urgent -->
    <div ref="wheelAnnouncer" aria-live="polite" aria-atomic="true" class="sr-only"></div>

    <!-- Image jeu-concours positionnée par rapport à la roue -->
    <div class="absolute -top-[4rem] -right-4 lg:top-[-2rem] lg:right-[-6rem] w-24 lg:w-32 z-10">
      <img :src="wheelImages.game" alt="Grand Jeu 100% gagnant" class="rotate-12" />
    </div>

    <div class="wheel-wrapper">

    <img class="wheel-layer wheel-structure" :src="wheelImages.structure" alt="" aria-hidden="true" />
    <img
        class="wheel-layer wheel-background"
        :style="{ transform: `rotate(${currentRotation}deg)` }"
        :src="wheelImages.background"
        alt=""
        aria-hidden="true"
    />
    <img class="wheel-layer wheel-arrow" :class="{ 'arrow-wobble': isSpinning }" :src="wheelImages.arrow" alt="" aria-hidden="true" />
  </div>
</div>
  <div class="form-container">
    <UForm :schema="uniqueCodeSchema" :state="state" class="space-y-6 !ttt-form-no-blue" @submit="onSubmit" @error="onError">
      <UFormGroup name="code">
        <template #label>
          <span class="ttt-form-label">
            Code sur votre ticket d'achat supérieur à 49€
          </span>
        </template>

        <div v-if="hasError" class="mb-2 text-red-500 text-sm font-medium">
          {{ errorMessage }}
        </div>

        <UInput
            v-model="state.code"
            name="code"
            placeholder="Code unique à 10 caractères, par exemple : DFGT67YH78"
            size="xl"
            variant="none"
            class="ttt-input-dark font-mono"
            :class="{ 'input-error': hasError }"
            :disabled="isSpinning"
            @input="hasError = false; errorMessage = ''"
        />
      </UFormGroup>

      <UButton
          type="submit"
          block
          size="xl"
          class="btn-primary"
          :ui="{ base: '!text-ttt-white font-bold uppercase', font: '!font-bold' }"
          :loading="loading || cooldownActive"
          :disabled="isSpinning || cooldownActive"
      >
        Lancer la roue
      </UButton>
    </UForm>
  </div>
  <div class="flex flex-wrap justify-center gap-2 mb-1 w-[80vw] lg:w-[60vw] lg:p-[1.5rem]">
    <p class="text-justify lg:text-center font-bold text-ttt-white">
      Une fois votre gain validé, présentez votre code unique en boutique pour récupérer votre lot.
    </p>
    <p class="text-justify lg:text-center text-lg text-ttt-white/80 z-10">
      Vous disposez de 30 jours supplémentaires à l'issue du jeu concours pour récupérer votre lot grâce à votre code.
    </p>
  </div>
  <!-- winResult passé en prop -->
  <WinModale v-model="isModalOpen" :win-result="winResult" />
</template>

<style scoped lang="scss" src="./SpinWheel.scss" />