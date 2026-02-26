<script setup lang="ts">
import WinModale from "~/components/modales/WinModale.vue";
import { uniqueCodeSchema } from "~/utils/unique-code-schema";
import type { WinResult } from '~/types/game'

const { invalidate, fetchUser } = useAuth()
const toast = useToast()

const hasError = ref(false)
const errorMessage = ref('')

const loading = ref(false)
const isSpinning = ref(false)
const isModalOpen = ref(false)
const currentRotation = ref(0)
const winResult = ref<WinResult | null>(null)

const wheelImages = {
  structure: '/images/wheel/structure.webp',
  background: '/images/wheel/background.webp',
  arrow: '/images/wheel/arrow.webp',
  game: '/images/jeu-concours.webp',
} as const

const state = reactive({ code: '' })

const SPIN_DURATION_MS = 4000
const MIN_TURNS = 5
const MAX_TURNS = 8
// anti spam "Lancer la roue"
const cooldownActive = ref(false)
const COOLDOWN_MS = 3000

function spinToRandom(): Promise<void> {
  return new Promise((resolve) => {
    const extraTurns = MIN_TURNS + Math.floor(Math.random() * (MAX_TURNS - MIN_TURNS))
    const randomAngle = Math.floor(Math.random() * 360)
    currentRotation.value += extraTurns * 360 + randomAngle
    setTimeout(resolve, SPIN_DURATION_MS)
  })
}

async function onSubmit() {
  if (isSpinning.value || loading.value || cooldownActive.value) return

  loading.value = true
  hasError.value = false
  errorMessage.value = ''

  try {
    const response = await $fetch('/api/auth/code', {
      method: 'POST',
      body: { code: state.code }
    })

    winResult.value = {
      gainLabel: response.gain.name,
      gainId: response.gain.id,
      codeId: response.id
    }

    isSpinning.value = true
    await spinToRandom()
    // Invalide et recharge les données user AVANT d'ouvrir la modale (recharge le tableau des gains)
    invalidate()
    await fetchUser()
    isModalOpen.value = true

  } catch (err: any) {
    hasError.value = true
    errorMessage.value = err.data?.message || 'Ce code est invalide ou déjà utilisé.'

    cooldownActive.value = true
    setTimeout(() => {
      cooldownActive.value = false
    }, COOLDOWN_MS)

    toast.add({
      title: 'Code invalide',
      description: errorMessage.value,
      color: 'red',
      timeout: 5000
    })

    loading.value = false
  } finally {
    loading.value = false
    isSpinning.value = false
  }
}
</script>

<template>
  <div class="wheel-wrapper mt-6">
    <div class="absolute top-[-1rem] right-[-6rem] w-32 hidden md:block">
      <img :src="wheelImages.game" alt="Grand Jeu 100% gagnant" class="rotate-12" />
    </div>
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

  <div class="form-container">
    <UForm :schema="uniqueCodeSchema" :state="state" class="space-y-6 !ttt-form-no-blue" @submit="onSubmit">
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