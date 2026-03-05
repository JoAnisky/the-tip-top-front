<script setup lang="ts">
const isOpen = defineModel<boolean>({ default: false })

const { consent, saveConsent, acceptAll, rejectAll } = useCookieConsent()

// Copie locale des préférences pour édition dans la modale
// (on ne sauvegarde qu'au clic sur "Enregistrer")
const localPreferences = ref(consent.value.preferences)
const localAnalytics = ref(consent.value.analytics)
const localSocial = ref(consent.value.social)

watch(consent, (val) => {
  localPreferences.value = val.preferences
  localAnalytics.value = val.analytics
  localSocial.value = val.social
})

function handleSave() {
  saveConsent({
    preferences: localPreferences.value,
    analytics: localAnalytics.value,
    social: localSocial.value,
  })
  isOpen.value = false
}

function handleAcceptAll() {
  acceptAll()
  isOpen.value = false
}

function handleRejectAll() {
  rejectAll()
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
              aria-label="Fermer la gestion des cookies"
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
              <h4 class="text-2xl text-ttt-black font-medium tracking-wide font-lato">Cookies nécessaires</h4>
              <p class="text-xs text-ttt-black/70 mt-0.5">Connexion et participation au jeu. Indispensables.</p>
            </div>
            <UBadge color="white" variant="solid" class="text-xs uppercase flex-shrink-0 mt-0.5">Toujours actif</UBadge>
          </div>

          <UDivider />

          <!-- Préférences -->
          <div class="flex items-start justify-between gap-4">
            <div>
              <h4 class="text-2xl text-ttt-black font-medium tracking-wide font-lato">Cookies de préférences</h4>
              <p class="text-xs text-ttt-black/70 mt-0.5">Mémorise vos choix sur le site.</p>
            </div>
            <UToggle v-model="localPreferences" color="lime" class="flex-shrink-0 mt-0.5" aria-label="Activer les cookies de préférences" />
          </div>

          <UDivider />

          <!-- Mesure d'audience -->
          <div class="flex items-start justify-between gap-4">
            <div>
              <h4 class="text-2xl text-ttt-black font-medium tracking-wide font-lato">Mesure d'audience</h4>
              <p class="text-xs text-ttt-black/70 mt-0.5">Statistiques anonymes de fréquentation (Google Analytics).</p>
            </div>
            <UToggle v-model="localAnalytics" color="lime" class="flex-shrink-0 mt-0.5" aria-label="Activer les cookies de mesure d'audience"
            />
          </div>

          <UDivider />

          <!-- Connexion sociale -->
          <div class="flex items-start justify-between gap-4">
            <div>
              <h4 class="text-2xl text-ttt-black font-medium tracking-wide font-lato">Connexion sociale</h4>
              <p class="text-xs text-ttt-black/70 mt-0.5">Uniquement si vous vous connectez via Google ou Facebook.</p>
            </div>
            <UToggle v-model="localSocial" color="lime" class="flex-shrink-0 mt-0.5" aria-label="Activer les cookies de connexion sociale"/>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex flex-wrap justify-between gap-3">
          <UButton
              color="black"
              variant="ghost"
              label="Tout refuser"
              class="text-ttt-black/70 hover:text-ttt-black hover:bg-gray-100"
              @click="handleRejectAll"
          />
          <div class="flex gap-2">
            <UButton
                color="black"
                variant="outline"
                label="Tout accepter"
                class="text-ttt-black hover:bg-gray-100"
                @click="handleAcceptAll"
            />
            <UButton
                label="Enregistrer"
                color="lime"
                class="!text-ttt-black font-bold uppercase border-none"
                @click="handleSave"
            />
          </div>
        </div>
      </template>
    </UCard>
  </UModal>
</template>