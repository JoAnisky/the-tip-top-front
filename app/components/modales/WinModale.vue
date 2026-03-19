<script setup lang="ts">
import { useGifts } from '~/composables/useGifts'
import JSConfetti from 'js-confetti'
import type { WinResult } from '~/shared/types/game'

const isOpen = defineModel<boolean>({ default: false })

const props = defineProps<{
  modelValue: boolean
  winResult: WinResult | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const { getGiftByName } = useGifts()

const matchedGift = computed(() => {
  if (!props.winResult) return null
  return getGiftByName(props.winResult.gainLabel)
})

// Initialise JSConfetti une seule fois
let jsConfetti: JSConfetti | null = null

onMounted(() => {
  jsConfetti = new JSConfetti()
})

// Surveille l'ouverture de la modale pour lancer les confettis
watch(() => props.modelValue, (isNowOpen) => {
  if (isNowOpen && jsConfetti) {
    launchConfetti()
  }
})

function launchConfetti() {
  if (!jsConfetti) return

  // Première salve — centre
  jsConfetti.addConfetti({confettiColors: ['#f05d23', '#f08300', '#FFD700', '#ffffff'], confettiNumber: 120,})

  // Deuxième salve — décalée
  setTimeout(() => {
    jsConfetti?.addConfetti({confettiColors: ['#f05d23', '#FFD700', '#ffffff'], confettiNumber: 60,})
  }, 200)

  // Troisième salve
  setTimeout(() => {
    jsConfetti?.addConfetti({confettiColors: ['#f05d23', '#FFD700', '#ffffff'], confettiNumber: 60,})
  }, 400)
}
</script>

<template>
  <UModal
      :model-value="modelValue"
      :prevent-close="true"
      @update:model-value="emit('update:modelValue', $event)"
      :ui="{ container: 'flex min-h-full items-center justify-center text-center', align: 'center' }"
  >
    <UCard :ui="{ ring: '', background: 'bg-ttt-dark-grey dark:bg-ttt-dark-grey' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-bold text-ttt-white uppercase font-lato text-center">
            Félicitations !
          </h3>
          <UButton
              color="black"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              aria-label="Fermer la modale"
              class="-my-1 text-ttt-white hover:bg-ttt-white/5"
              @click="isOpen = false"
          />
        </div>
      </template>

      <div class="py-1 flex flex-col items-center text-center">
        <h3 class="text-xl font-bold text-ttt-white uppercase font-lato text-center">Vous avez gagné le lot </h3>

        <!-- Image avec effet hover identique à GiftList -->
        <div v-if="matchedGift" class="group flex flex-col items-center mb-2">
          <img
              :src="matchedGift.image"
              alt=""
              class="w-56 h-56 object-contain transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]"
              loading="lazy"
          />
        </div>

        <div class="space-y-2 mb-4">
          <h4 class="text-3xl font-bold text-ttt-orange">{{ winResult?.gainLabel }}</h4>
          <p class="text-sm text-gray-200">
            Présentez votre ticket de caisse comportant le code en boutique pour récupérer votre lot.
          </p>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-center">
          <UButton
              block
              class="btn-primary mt-4"
              @click="emit('update:modelValue', false)"
              :ui="{ base: '!text-ttt-white font-bold uppercase', font: '!font-bold' }"
          >
            Fermer
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>