<script setup lang="ts">
const isOpen = defineModel<boolean>({ default: false })
const analytics = ref<boolean>(true);
</script>

<template>
  <UModal v-model="isOpen"
    :ui="{
    container: 'flex min-h-full items-center justify-center text-center',
    align: 'center'
  }"
  >
    <UCard :ui="{
      ring: '',
      divide: 'divide-y divide-ttt-black/10',
      background: 'bg-ttt-white dark:bg-ttt-white',
    }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-bold text-ttt-black uppercase font-lato">
            Gestion des cookies
          </h3>
          <UButton
              color="black"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1 text-ttt-black hover:bg-ttt-black/5"
              @click="isOpen = false"
          />
        </div>
      </template>

      <div class="py-2">
        <p class="text-ttt-black/80 mb-6 leading-relaxed">
          Nous utilisons des cookies pour améliorer votre expérience sur le site de Thé Tip Top.
          Certains sont nécessaires au bon fonctionnement du jeu concours.
        </p>

        <div class="space-y-4 mb-4">
          <div class="flex items-center justify-between">
            <span class="font-medium text-ttt-black">Cookies Essentiels</span>
            <UBadge color="white" variant="solid" class="text-xs uppercase">Toujours actif</UBadge>
          </div>
          <div class="flex items-center justify-between">
            <span class="font-medium text-ttt-black">Analytique & Statistiques</span>
            <UToggle
                v-model="analytics"
                color="lime"
            />
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3">
          <UButton
              color="black"
              variant="ghost"
              label="Tout refuser"
              class="text-ttt-black/60 hover:text-ttt-black hover:bg-gray-100"
              @click="isOpen = false; analytics=false"
          />
          <UButton
              label="Accepter et fermer"
              color="lime"
              class="!text-ttt-black font-bold uppercase border-none"
              @click="isOpen = false"
          />
        </div>
      </template>
    </UCard>
  </UModal>
</template>