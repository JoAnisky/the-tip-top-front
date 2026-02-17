<script setup lang="ts">
import type { WinResult } from '~/types/game'
const isOpen = defineModel<boolean>({ default: false })

const props = defineProps<{
  modelValue: boolean
  winResult: WinResult | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <UModal :model-value="modelValue" :prevent-close="true" @update:model-value="emit('update:modelValue', $event)"
    :ui="{container: 'flex min-h-full items-center justify-center text-center',align: 'center'}">
    <UCard :ui="{ ring: '',background: 'bg-ttt-dark-grey dark:bg-ttt-dark-grey' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-bold text-ttt-white uppercase font-lato">
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
      <div class="py-2">
        <p class="text-ttt-white/80 mb-6 leading-relaxed">
          Vous avez gagné :
        </p>
        <div class="space-y-4 mb-4">
          <p class="text-3xl font-bold text-orange-400">{{ winResult?.gainLabel }}</p>
          <p class="text-sm text-gray-200">
            Présentez votre ticket de caisse comportant le code en boutique pour récupérer votre lot.
          </p>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-3">
          <UButton block class="btn-primary mt-4" @click="emit('update:modelValue', false)"
                   :ui="{base: '!text-ttt-white font-bold uppercase',font: '!font-bold'}">
            Fermer
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>