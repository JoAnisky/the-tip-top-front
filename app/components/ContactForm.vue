<script setup lang="ts">
import { z } from 'zod'

import type { FormSubmitEvent} from '#ui/types'
import { contactSchema } from "~/utils/contact-schema";

type ContactForm = z.output<typeof contactSchema>

const toast = useToast()

const formState = reactive<ContactForm>({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: '',
})

const isSending = ref<boolean>(false);
const isSuccess = ref<boolean>(false);
// Sujets pour le select
const subjectOptions = [
  { value: 'question', label: 'J\'ai une question sur le jeu concours' },
  { value: 'help', label: 'J\'ai besoin d\'aide sur le site' },
  { value: 'bug', label: 'Signaler un bug sur le site' },
  { value: 'demo', label: 'Demander une démo' },
]

async function onSubmit(event: FormSubmitEvent<ContactForm>) {
  isSending.value = true;
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: event.data
    })
    isSuccess.value = true
  } catch (error) {
    toast.add({
      title: 'Erreur',
      description: 'Impossible d\envoyer votre message, veuillez réessayer.',
      color: 'red',
    })
  } finally {
    isSending.value = false;
  }
}

</script>

<template>
  <div class="max-w-2xl mx-auto pt-4 pb-1  pb-32">
    <!-- Message de succès -->
    <div v-if="isSuccess" class="bg-green-900/20 border border-green-800 rounded-2xl p-10 text-center flex flex-col items-center gap-4">
      <UIcon name="i-heroicons-check-circle" class="w-12 h-12 text-green-400" />
      <h2 class="text-xl font-semibold text-white">Message envoyé !</h2>
      <p class="text-white/70 text-sm">Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>
      <UButton variant="ghost" color="gray" @click="isSuccess = false">Envoyer un autre message</UButton>
    </div>

    <!-- Card formulaire -->
    <UCard
        v-else
        class="w-full shadow-2xl !bg-ttt-form-background !ring-white/10 !ring-1"
        :ui="{ body: { padding: 'p-8 sm:p-10' }, ring: '', divide: '' }"
    >
      <div class="p-4">
        <p class="text-lg font-semibold text-white mb-6">Envoyer un message</p>

        <UForm :schema="contactSchema" :state="formState" class="space-y-6" @submit="onSubmit">

          <!-- Prénom / Nom -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormGroup name="firstName">
              <template #label>
                <span class="ttt-form-label">Prénom 
                  <span class="text-red-400">*</span>
                  <span class="sr-only">(obligatoire)</span>
                </span>
              </template>
              <UInput v-model="formState.firstName" placeholder="Votre prénom" size="xl" variant="none" class="ttt-input-dark" />
            </UFormGroup>

            <UFormGroup name="lastName">
              <template #label>
                <span class="ttt-form-label">Nom
                  <span class="text-red-400">*</span>
                  <span class="sr-only">(obligatoire)</span>
                </span>
              </template>
              <UInput v-model="formState.lastName" placeholder="Votre nom" size="xl" variant="none" class="ttt-input-dark" />
            </UFormGroup>
          </div>

          <!-- Email -->
          <UFormGroup name="email">
            <template #label>
              <span class="ttt-form-label">Adresse email
                <span class="text-red-400">*</span>
                <span class="sr-only">(obligatoire)</span>
              </span>
            </template>
            <UInput v-model="formState.email" type="email" placeholder="votre@email.com" icon="i-heroicons-envelope" size="xl" variant="none" class="ttt-input-dark" />
          </UFormGroup>

          <!-- Objet -->
          <UFormGroup name="subject">
            <template #label>
              <span class="ttt-form-label">Objet
                <span class="text-red-400">*</span>
                <span class="sr-only">(obligatoire)</span>
              </span>
            </template>
            <USelect
                v-model="formState.subject"
                :options="subjectOptions"
                value-attribute="value"
                option-attribute="label"
                placeholder="Sélectionnez un objet"
                size="xl"
                variant="none"
                class="ttt-input-dark"
                :ui="{ placeholder: 'text-gray-300' }"
            />
          </UFormGroup>

          <!-- Message -->
          <UFormGroup name="message">
            <template #label>
              <span class="ttt-form-label">Message
                <span class="text-red-400">*</span>
                <span class="sr-only">(obligatoire)</span>
              </span>
            </template>
            <UTextarea v-model="formState.message" placeholder="Votre message..." :rows="6" size="xl" variant="none" class="ttt-input-dark" />
          </UFormGroup>

          <p class="text-sm italic text-gray-400">
            Les champs marqués d'un <span class="text-red-400">*</span> sont obligatoires
          </p>

          <div class="flex justify-end">
            <UButton
                type="submit"
                size="xl"
                :loading="isSending"
                class="btn-primary"
                :ui="{ base: '!text-ttt-white font-bold', font: '!font-bold' }"
            >
              <UIcon name="i-heroicons-paper-airplane" class="mr-2" />
              Envoyer le message
            </UButton>
          </div>

        </UForm>
      </div>
    </UCard>

  </div>
</template>
<style scoped>
/* Placeholder du select quand aucune valeur n'est sélectionnée */
:deep(select option[value=""]),
:deep(select:invalid) {
  color: rgb(209 213 219); /* gray-300 */
}

/* La valeur placeholder affichée dans le select natif */
:deep(.ttt-input-dark select) {
  color: rgb(209 213 219); /* gray-300 quand placeholder */
}
</style>