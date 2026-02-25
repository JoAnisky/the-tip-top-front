<script setup lang="ts">
import CookieModal from "~/components/cookies/CookieModal.vue";

const { hasDecided, acceptAll, rejectAll } = useCookieConsent()

// Contrôle la visibilité du bandeau
// On le cache si l'utilisateur a déjà décidé, ou s'il vient de faire un choix
const isVisible = ref(false)

// On attend le montage côté client pour éviter le flash SSR
onMounted(() => {
  isVisible.value = !hasDecided.value
})

// Ouvre la modale de gestion détaillée
const isModalOpen = ref(false)

function handleAcceptAll() {
  acceptAll()
  isVisible.value = false
}

function handleRejectAll() {
  rejectAll()
  isVisible.value = false
}

function handleOpenModal() {
  isModalOpen.value = true
}

// Quand la modale se ferme, on vérifie si un choix a été fait
watch(isModalOpen, (open) => {
  if (!open && hasDecided.value) {
    isVisible.value = false
  }
})

// Quand hasDecided change depuis n'importe où (login, CookiesBtn...)
watch(hasDecided, (decided) => {
  if (decided) isVisible.value = false
})

</script>

<template>
  <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-y-full"
      enter-to-class="translate-y-0"
      leave-active-class="transition-transform duration-200 ease-in"
      leave-from-class="translate-y-0"
      leave-to-class="translate-y-full"
  >
    <div
        v-if="isVisible"
        class="fixed bottom-0 left-0 right-0 z-40 bg-ttt-black border-t border-white/10 px-4 py-4 shadow-2xl"
        role="dialog"
        aria-label="Gestion des cookies"
        aria-live="polite"
    >
      <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <!-- Texte -->
        <p class="text-white text-sm leading-relaxed">
          Nous utilisons des cookies pour assurer le fonctionnement du site et, avec votre accord,
          mesurer notre audience et faciliter votre connexion.
          <NuxtLink to="/politique-de-cookies" class="text-ttt-orange hover:underline ml-1">
            En savoir plus
          </NuxtLink>
        </p>

        <!-- Actions -->
        <div class="flex flex-wrap items-center gap-2 flex-shrink-0">
          <UButton
              variant="ghost"
              size="sm"
              label="Personnaliser"
              class="text-white/80 hover:text-white hover:bg-white/10"
              @click="handleOpenModal"
          />
          <UButton
              variant="outline"
              size="sm"
              label="Tout refuser"
              class="text-white border-white/30 hover:bg-white/10"
              @click="handleRejectAll"
          />
          <UButton
              size="sm"
              label="Tout accepter"
              color="lime"
              class="!text-ttt-black font-bold"
              @click="handleAcceptAll"
          />
        </div>
      </div>
    </div>
  </Transition>

  <!-- Modale de gestion détaillée -->
  <CookieModal v-model="isModalOpen" />
</template>