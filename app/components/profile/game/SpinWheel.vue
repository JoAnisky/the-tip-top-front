<script setup lang="ts">
import WinModale from "~/components/modales/WinModale.vue";
import { uniqueCodeSchema } from "~/utils/unique-code-schema";
import type { WinResult } from '~/types/game'

const toast = useToast()

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

function spinToRandom(): Promise<void> {
  return new Promise((resolve) => {
    const extraTurns = MIN_TURNS + Math.floor(Math.random() * (MAX_TURNS - MIN_TURNS))
    const randomAngle = Math.floor(Math.random() * 360)
    currentRotation.value += extraTurns * 360 + randomAngle
    setTimeout(resolve, SPIN_DURATION_MS)
  })
}

async function onSubmit() {
  loading.value = true
  isSpinning.value = true

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

    console.log("response : " , response)
    await spinToRandom()
    isModalOpen.value = true

  } catch (err: any) {
    toast.add({
      title: 'Code invalide',
      description: err.data?.message || 'Ce code est invalide ou déjà utilisé.',
      color: 'red',
      timeout: 5000
    })
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
    <img class="wheel-layer wheel-arrow" :src="wheelImages.arrow" alt="" aria-hidden="true" />
  </div>

  <div class="form-container">
    <UForm :schema="uniqueCodeSchema" :state="state" class="space-y-6 !ttt-form-no-blue" @submit="onSubmit">
      <UFormGroup name="code">
        <template #label>
          <span class="ttt-form-label">
            Code sur votre ticket d'achat supérieur à 49€
          </span>
        </template>
        <UInput
            v-model="state.code"
            name="code"
            placeholder="Code unique à 10 caractères"
            size="xl"
            variant="none"
            class="ttt-input-dark"
            :disabled="isSpinning"
        />
      </UFormGroup>

      <UButton
          type="submit"
          block
          size="xl"
          class="btn-primary"
          :ui="{ base: '!text-ttt-white font-bold uppercase', font: '!font-bold' }"
          :loading="loading"
          :disabled="isSpinning"
      >
        Lancer la roue
      </UButton>
    </UForm>
  </div>

  <!-- winResult passé en prop -->
  <WinModale v-model="isModalOpen" :win-result="winResult" />
</template>

<style scoped lang="scss" src="./SpinWheel.scss" />