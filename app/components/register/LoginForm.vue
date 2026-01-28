<script setup lang="ts">

import {loginSchema} from "#imports";

const loading = ref(false)
const { fetch: refreshSession } = useUserSession()

const state = reactive({
  email: '',
  password: ''
})
const emit = defineEmits(['switchForm']);

async function onSubmit() {
  loading.value = true
  try {
    // 1. Appel à la route serveur Nuxt (Server Action / Proxy)
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: state
    })

    // 2. On rafraîchit la session locale (auth-utils)
    await refreshSession()

    // 3. Redirection vers le jeu
    navigateTo('/profile')
  } catch (err) {
    useToast().add({
      title: 'Erreur de connexion',
      description: 'Identifiants incorrects ou problème serveur.',
      color: 'red'
    })
  } finally {
    loading.value = false
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
          <UButton color="gray" variant="solid" block class="h-11 px-4 !bg-[#1877F2] hover:!bg-[#166FE5] text-white flex-1">
            <img src="/images/facebook-logo.svg" alt="Facebook" class="w-5 h-5 mr-2" />
            <span class="hidden sm:inline">Facebook</span>
          </UButton>

          <!-- Bouton Google -->
          <UButton color="white" variant="solid" block class="h-11 px-4 !bg-white hover:!bg-gray-100 !text-gray-700 flex-1">
            <img src="/images/google-logo.svg" alt="Google" class="w-5 h-5 mr-2" />
            <span class="hidden sm:inline">Google</span>
          </UButton>
        </div>

        <UDivider label="ou" class="ttt-divider mb-8"/>

        <UForm :schema="loginSchema" :state="state" class="space-y-6 !ttt-form-no-blue" @submit="onSubmit">
          <UFormGroup label="Adresse email *" name="email" :ui="{ label: { base: 'ttt-form-label' } }">
            <UInput
                v-model="state.email"
                name="email"
                placeholder="Saisir votre adresse email"
                icon="i-heroicons-envelope"
                size="xl"
                variant="none"
                class="ttt-input-dark"
                :ui="{ icon: { base: 'text-gray-400' } }"
            />
          </UFormGroup>

          <UFormGroup label="Mot de passe *" name="password" :ui="{ label: { base: 'ttt-form-label' } }">
            <UInput
                v-model="state.password"
                type="password"
                placeholder="Saisir votre mot de passe"
                icon="i-heroicons-key"
                size="xl"
                variant="none"
                class="ttt-input-dark"
            />
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
    <p class="mt-8 text-gray-400 text-base">
      Pas encore de compte ?
      <button @click="emit('switchForm')" class="text-white font-bold hover:underline focus:outline-none" >S'inscrire</button>
    </p>
  </div>
</template>