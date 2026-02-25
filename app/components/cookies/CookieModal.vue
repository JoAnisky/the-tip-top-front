<script setup lang="ts">
const isOpen = defineModel<boolean>({ default: false })

const preferences = ref<boolean>(true)
const analytics = ref<boolean>(true)
const social = ref<boolean>(true)

function acceptAll() {
  preferences.value = true
  analytics.value = true
  social.value = true
  isOpen.value = false
}

function rejectAll() {
  preferences.value = false
  analytics.value = false
  social.value = false
  isOpen.value = false
}
</script>

<template>
  <UModal
      v-model="isOpen"
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
          Nous utilisons des cookies pour assurer le fonctionnement du site et, avec votre accord,
          pour mesurer notre audience et faciliter votre connexion.
          <NuxtLink to="/politique-de-cookies" class="underline text-ttt-black/60 hover:text-ttt-black" @click="isOpen = false">
            En savoir plus
          </NuxtLink>
        </p>

        <div class="space-y-4 mb-4">
          <!-- Essentiels -->
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="font-medium text-ttt-black">Cookies nécessaires</p>
              <p class="text-xs text-ttt-black/50 mt-0.5">Connexion et participation au jeu. Indispensables.</p>
            </div>
            <UBadge color="white" variant="solid" class="text-xs uppercase flex-shrink-0 mt-0.5">Toujours actif</UBadge>
          </div>

          <UDivider />

          <!-- Préférences -->
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="font-medium text-ttt-black">Cookies de préférences</p>
              <p class="text-xs text-ttt-black/50 mt-0.5">Mémorise vos choix sur le site.</p>
            </div>
            <UToggle v-model="preferences" color="lime" class="flex-shrink-0 mt-0.5" />
          </div>

          <UDivider />

          <!-- Mesure d'audience -->
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="font-medium text-ttt-black">Mesure d'audience</p>
              <p class="text-xs text-ttt-black/50 mt-0.5">Statistiques anonymes de fréquentation (Google Analytics).</p>
            </div>
            <UToggle v-model="analytics" color="lime" class="flex-shrink-0 mt-0.5" />
          </div>

          <UDivider />

          <!-- Connexion sociale -->
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="font-medium text-ttt-black">Connexion sociale</p>
              <p class="text-xs text-ttt-black/50 mt-0.5">Uniquement si vous vous connectez via Google ou Facebook.</p>
            </div>
            <UToggle v-model="social" color="lime" class="flex-shrink-0 mt-0.5" />
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
              @click="rejectAll"
          />
          <UButton
              label="Accepter et fermer"
              color="lime"
              class="!text-ttt-black font-bold uppercase border-none"
              @click="acceptAll"
          />
        </div>
      </template>
    </UCard>
  </UModal>
</template>