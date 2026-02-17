<script setup lang="ts">
import type { WinResult } from '~/types/game'

const props = defineProps<{
  modelValue: boolean
  winResult: WinResult | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <UModal :model-value="modelValue" :prevent-close="true" @update:model-value="emit('update:modelValue', $event)">
    <div class="p-6 text-center space-y-4">
      <p class="text-2xl font-bold text-white">Félicitations !</p>
      <p class="text-gray-300">Vous avez gagné :</p>
      <p class="text-3xl font-bold text-orange-400">{{ winResult?.gainLabel }}</p>
      <p class="text-sm text-gray-400">
        Présentez ce résultat en boutique pour récupérer votre lot.
      </p>
      <UButton block class="btn-primary mt-4" @click="emit('update:modelValue', false)">
        Fermer
      </UButton>
    </div>
  </UModal>
</template>