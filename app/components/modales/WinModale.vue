<script setup lang="ts">
import type { WinResult } from '~/types/game'
import { useGifts } from '~/composables/useGifts'
import confetti from 'canvas-confetti'

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

// Surveille l'ouverture de la modale pour lancer les confettis
watch(() => props.modelValue, (isNowOpen) => {
  if (isNowOpen) {
    launchConfetti()
  }
})

function launchConfetti() {
  confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ['#f05d23', '#FFD700', '#ffffff'] })
  setTimeout(() => confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0, y: 0.65 }, colors: ['#f05d23', '#FFD700', '#ffffff'] }), 200)
  setTimeout(() => confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1, y: 0.65 }, colors: ['#f05d23', '#FFD700', '#ffffff'] }), 400)
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
              class="-my-1 text-ttt-white hover:bg-ttt-white/5"
              @click="isOpen = false"
          />
        </div>
      </template>

      <div class="py-1 flex flex-col items-center text-center">
        <p class="text-ttt-white/80 mb-1 leading-relaxed">Vous avez gagné le lot </p>

        <!-- Image avec effet hover identique à GiftList -->
        <div v-if="matchedGift" class="group flex flex-col items-center mb-2">
          <img
              :src="matchedGift.image"
              :alt="matchedGift.name"
              class="w-56 h-56 object-contain transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]"
              loading="lazy"
          />
        </div>

        <div class="space-y-2 mb-4">
          <p class="text-3xl font-bold text-ttt-orange">{{ winResult?.gainLabel }}</p>
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