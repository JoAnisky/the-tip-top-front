<script setup lang="ts">

import {registerSchema} from "#imports";

const emit = defineEmits(['switchForm']);
const loading = ref(false);
const toast = useToast();

const state = reactive({
  gender: 'male',
  firstName: '',
  lastName: '',
  birthDate: '', // Format YYYY-MM-DD pour l'input type="date"
  email: '',
  plainPassword: '',
  confirmPassword: '',
  address: '',
  postalCode: '',
  city: '',
  acceptTerms: false,
  newsletter: false
});

const genderOptions = [
  { value: 'male', label: 'Un homme' },
  { value: 'female', label: 'Une femme' }
];

async function onSubmit() {
  loading.value = true;
  try {
    // fetch API
    await $fetch('/api/auth/register', { method: 'POST', body: state });
    toast.add({ title: 'Compte créé !', color: 'green' });
    emit('switchForm'); // Retour au login après succès
  } catch (err) {
    toast.add({ title: 'Erreur', description: 'Une erreur est survenue', color: 'red' });
  } finally {
    loading.value = false;
  }
}

</script>

<template>
  <div class="w-full flex flex-col items-center pb-[8.5rem]">
    <UCard class="w-full max-w-2xl shadow-2xl overflow-visible relative !bg-ttt-form-background !ring-white/10 !ring-1" :ui="{body: { padding: 'p-8 sm:p-10' },ring: '',divide: ''}">
      <div class="absolute -top-12 -right-8 w-32 hidden md:block">
        <img src="/images/jeu-concours.webp" alt="Grand Jeu 100% gagnant" class="rotate-12" />
      </div>

      <div class="p-2">
        <p class="text-xl font-bold text-white mb-2">Créer mon compte</p>
        <UDivider class="ttt-divider mb-8"/>
        <p class="text-base text-gray-200 mb-6 italic font-bold">Les champs marqués d'un <span class="text-red-500">*</span> sont obligatoires</p>

        <UForm :schema="registerSchema" :state="state" class="space-y-4" @submit="onSubmit">

          <UFormGroup label="Vous êtes :" name="gender" :ui="{ label: { base: 'ttt-form-label' } }">
            <URadioGroup v-model="state.gender" :options="genderOptions" color="neutral" :ui="{wrapper: 'flex flex-row gap-6',fieldset: 'flex flex-row gap-8'}"/>
          </UFormGroup>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormGroup name="firstName">
              <template #label>
                <span class="ttt-form-label">
                  Prénom <span class="text-red-500">*</span>
                </span>
              </template>
              <UInput v-model="state.firstName" placeholder="Votre prénom" size="xl" variant="none" class="ttt-input-dark" />
            </UFormGroup>
            <UFormGroup name="lastName">
              <template #label>
                <span class="ttt-form-label">
                  Nom <span class="text-red-500">*</span>
                </span>
              </template>
              <UInput v-model="state.lastName" placeholder="Votre nom" size="xl" variant="none" class="ttt-input-dark" />
            </UFormGroup>
          </div>

          <UFormGroup name="birthDate">
            <template #label>
                <span class="ttt-form-label">
                  Date de naissance <span class="text-red-500">*</span>
                </span>
            </template>
            <UInput v-model="state.birthDate" type="date" size="xl" variant="none" class="ttt-input-dark custom-date-input" />
          </UFormGroup>

          <UFormGroup name="email">
            <template #label>
                <span class="ttt-form-label">
                  Adresse email <span class="text-red-500">*</span>
                </span>
            </template>
            <UInput v-model="state.email" placeholder="Saisir votre email" icon="i-heroicons-envelope" size="xl" variant="none" class="ttt-input-dark" />
          </UFormGroup>

          <UFormGroup label="Adresse postale" name="address" :ui="{ label: { base: 'ttt-form-label' } }">
            <UInput v-model="state.address" placeholder="N° et nom de rue" size="xl" variant="none" class="ttt-input-dark" />
          </UFormGroup>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <UFormGroup label="Code postal" name="postalCode" class="md:col-span-1" :ui="{ label: { base: 'ttt-form-label' } }">
              <UInput v-model="state.postalCode" placeholder="Ex: 75001" size="xl" variant="none" class="ttt-input-dark" />
            </UFormGroup>
            <UFormGroup label="Ville" name="city" class="md:col-span-2" :ui="{ label: { base: 'ttt-form-label' } }">
              <UInput v-model="state.city" placeholder="Votre ville" size="xl" variant="none" class="ttt-input-dark" />
            </UFormGroup>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/5 pt-4">
            <UFormGroup name="plainPassword">
              <template #label>
                <span class="ttt-form-label">
                  Mot de passe <span class="text-red-500">*</span>
                </span>
              </template>
              <UInput v-model="state.plainPassword" type="password" placeholder="8 caract. min" icon="i-heroicons-key" size="xl" variant="none" class="ttt-input-dark" />
            </UFormGroup>
            <UFormGroup name="confirmPassword">
              <template #label>
                <span class="ttt-form-label">
                  Confirmez votre mot de passe <span class="text-red-500">*</span>
                </span>
              </template>
              <UInput v-model="state.confirmPassword" type="password" placeholder="Répétez le mot de passe" icon="i-heroicons-key" size="xl" variant="none" class="ttt-input-dark" />
            </UFormGroup>
          </div>

          <div class="space-y-3 pt-2">
            <UFormGroup name="acceptTerms">
              <UCheckbox v-model="state.acceptTerms" color="neutral" :ui="{ label: 'text-base text-gray-300' }">
                <template #label>
                  <span>J’accepte les <NuxtLink to="/cgu" class="text-ttt-orange underline">conditions générales d’utilisation</NuxtLink> <span class="text-red-500">*</span></span>
                </template>
              </UCheckbox>
            </UFormGroup>
            <UCheckbox v-model="state.newsletter" label="J’accepte de recevoir la newsletter Thé Tip Top" color="neutral" :ui="{ label: 'text-base text-gray-300' }" />
          </div>

          <UButton type="submit" block size="xl" class="btn-primary mt-4" :ui="{base: '!text-ttt-white font-bold uppercase',font: '!font-bold'}" :loading="loading">
            S'inscrire
          </UButton>
        </UForm>
      </div>
    </UCard>

    <p class="mt-8 text-gray-200 text-base">
      Déjà inscrit ?
      <button type="button" @click="emit('switchForm')" class="text-white font-bold underline focus:outline-none">
        Se connecter
      </button>
    </p>
  </div>
</template>

<style scoped>

</style>