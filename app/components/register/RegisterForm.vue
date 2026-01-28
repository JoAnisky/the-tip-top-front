<script setup lang="ts">

import {registerSchema} from "#imports";

const emit = defineEmits(['switchForm']);

const loading = ref(false);

// State avec les champs d'inscription
const state = reactive({
  email: '',
  password: '',
  // autres champs à rajouter
});

async function onSubmit() {
  loading.value = true;
  try {
    // appel API pour l'inscription ici
    console.log('Inscription avec :', state);
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
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
        <p>Inscription</p>

        <UForm :schema="registerSchema" :state="state" class="space-y-6" @submit="onSubmit">
          <UFormGroup label="Adresse email *" name="email" :ui="{ label: { base: 'ttt-form-label' } }">
            <UInput
                v-model="state.email"
                placeholder="Saisir votre adresse email"
                icon="i-heroicons-envelope"
                size="xl"
                variant="none"
                class="ttt-input-dark"
            />
          </UFormGroup>

          <UFormGroup label="Mot de passe *" name="password" :ui="{ label: { base: 'ttt-form-label' } }">
            <UInput
                v-model="state.password"
                type="password"
                placeholder="Créer un mot de passe"
                icon="i-heroicons-key"
                size="xl"
                variant="none"
                class="ttt-input-dark"
            />
          </UFormGroup>

          <UButton type="submit" block size="xl" class="btn-primary" :ui="{base: '!text-ttt-white font-bold uppercase',font: '!font-bold'}" :loading="loading">
            S'inscrire
          </UButton>
        </UForm>
      </div>
    </UCard>

    <p class="mt-8 text-gray-400 text-base">
      Déjà inscrit ?
      <button type="button" @click="emit('switchForm')" class="text-white font-bold hover:underline focus:outline-none">
        Se connecter
      </button>
    </p>
  </div>
</template>

<style scoped>

</style>