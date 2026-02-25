<script setup lang="ts">
import { loginSchema } from "#imports";
const { login } = useAuth()
const { allowsSocial } = useCookieConsent()

const loading = ref(false)
const isPasswordVisible = ref(false)
const isCookieModalOpen = ref(false)

const toast = useToast()
const config = useRuntimeConfig()
const route = useRoute()

const state = reactive({
  email: '',
  password: ''
})

const emit = defineEmits<{
  switchForm: []
  openCookieModal: []
}>()

// URLs OAuth vers Symfony
const googleOAuthUrl = `${config.public.apiBaseUrl}/auth/oauth/google`
const facebookOAuthUrl = `${config.public.apiBaseUrl}/auth/oauth/facebook`

// Gestion erreur OAuth depuis query params
const oauthError = computed(() => route.query.error as string | undefined)

// Afficher l'erreur OAuth si présente
watch(oauthError, (error) => {
  if (error) {
    toast.add({
      title: 'Erreur OAuth',
      description: error,
      color: 'red',
      timeout: 5000
    })

    // Nettoyer l'URL
    navigateTo('/login', { replace: true })
  }
}, { immediate: true })

async function onSubmit() {
  loading.value = true
  try {
    await login(state.email, state.password)

    await navigateTo('/profile', { replace: true })

  } catch (err: any) {
    loading.value = false

    console.error('Erreur de login :', err)

    toast.add({
      title: 'Erreur de connexion',
      description: err.data?.message || err.message || 'Identifiants incorrects',
      color: 'red',
      timeout: 5000
    })
  } finally {
    loading.value = false
  }
}

/**
 * Intercepte le clic sur un bouton OAuth.
 * Si les cookies sociaux sont acceptés → redirige vers Symfony.
 * Sinon → ouvre la modale pour modifier les préférences.
 */
function handleOAuthClick(url: string) {
  if (allowsSocial.value) {
    navigateTo(url, { external: true })
  } else {
    isCookieModalOpen.value = true
  }
}

</script>

<template>
  <div class="w-full flex flex-col items-center">
    <UCard class="w-full max-w-lg shadow-2xl overflow-visible relative !bg-ttt-form-background !ring-white/10 !ring-1" :ui="{body: { padding: 'p-8 sm:p-10' },ring: '',divide: ''}">
      <div class="absolute -top-12 -right-8 w-32 hidden md:block">
        <img src="/images/jeu-concours.webp" alt="Grand Jeu 100% gagnant" class="rotate-12" />
      </div>

      <div class="p-4">
        <p>Se connecter</p>
        <div class="flex gap-5 my-4">
          <!-- Bouton Facebook -->
          <UTooltip :text="allowsSocial ? '' : 'Activez les cookies de connexion sociale pour utiliser cette option'" :prevent="allowsSocial" class="flex-1">
            <UButton color="gray" variant="solid" block class="h-11 px-4 text-white transition-opacity" :class="{
                '!bg-[#1877F2] hover:!bg-[#166FE5]': allowsSocial,
                '!bg-[#1877F2]/40 cursor-not-allowed': !allowsSocial
                }"
                :disabled="!allowsSocial"
                @click="handleOAuthClick(facebookOAuthUrl)"
            >
              <img src="/images/facebook-logo.svg" alt="Facebook" class="w-5 h-5 mr-2" />
              <span class="hidden sm:inline">Facebook</span>
            </UButton>
          </UTooltip>

          <!-- Bouton Google -->
          <UTooltip :text="allowsSocial ? '' : 'Activez les cookies de connexion sociale pour utiliser cette option'" :prevent="allowsSocial" class="flex-1">
            <UButton color="white" variant="solid" block class="h-11 px-4 transition-opacity" :class="{
                  '!bg-white hover:!bg-gray-100 !text-gray-700': allowsSocial,
                  '!bg-white/30 !text-gray-400 cursor-not-allowed': !allowsSocial
                }"
                :disabled="!allowsSocial"
                @click="handleOAuthClick(googleOAuthUrl)"
            >
              <img src="/images/google-logo.svg" alt="Google" class="w-5 h-5 mr-2" />
              <span class="hidden sm:inline">Google</span>
            </UButton>
          </UTooltip>
        </div>
        <!-- Lien modifier préférences si cookies sociaux refusés -->
        <p v-if="!allowsSocial" class="text-xs text-center text-white/70 -mt-2 mb-4">
          <button class="underline hover:text-white transition-colors" @click="emit('openCookieModal')">
            Modifier mes préférences de cookies
          </button>
          pour activer ces options.
        </p>
        <UDivider label="ou" class="ttt-divider mb-8"/>

        <UForm :schema="loginSchema" :state="state" class="space-y-6 !ttt-form-no-blue" @submit="onSubmit">
          <UFormGroup name="email">
            <template #label>
                <span class="ttt-form-label">
                  Adresse email <span class="text-red-500">*</span>
                </span>
            </template>
            <UInput
                v-model="state.email"
                name="email"
                placeholder="Saisir votre adresse email"
                autocomplete="email"
                icon="i-heroicons-envelope"
                size="xl"
                variant="none"
                class="ttt-input-dark"
                :ui="{ icon: { base: 'text-gray-400' } }"
            />
          </UFormGroup>

          <UFormGroup name="password">
            <template #label>
                <span class="ttt-form-label">
                  Mot de passe <span class="text-red-500">*</span>
                </span>
            </template>
            <UInput
                v-model="state.password"
                :type="isPasswordVisible ? 'text' : 'password'"
                placeholder="Saisir votre mot de passe"
                autocomplete="new-password"
                icon="i-heroicons-key"
                size="xl"
                variant="none"
                class="ttt-input-dark"
                :ui="{ icon: { trailing: { pointer: 'pointer-events-auto' } } }"
            >
              <template #trailing>
                <UButton
                    color="gray"
                    variant="ghost"
                    :icon="isPasswordVisible ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                    :padded="false"
                    @click="isPasswordVisible = !isPasswordVisible"
                    class="text-gray-400 hover:text-white hover:bg-transparent mr-2"
                />
              </template>
            </UInput>
          </UFormGroup>

          <UButton
              type="submit"
              block
              size="xl"
              class="btn-primary"
              :ui="{base: '!text-ttt-white font-bold uppercase',font: '!font-bold'}"
              :loading="loading"
          >
            Se connecter
          </UButton>
        </UForm>
      </div>
    </UCard>
    <p class="mt-8 text-gray-200 text-base z-10">
      Pas encore de compte ?
      <button @click="emit('switchForm')" class="text-white font-bold underline focus:outline-none" >S'inscrire</button>
    </p>
  </div>
</template>