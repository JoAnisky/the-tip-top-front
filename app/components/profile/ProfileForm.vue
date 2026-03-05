<script setup lang="ts">
import { profileSchema } from "#imports";
import type { FormSubmitEvent } from '#ui/types'
const { errorAnnouncer, onError } = useFormErrorAnnouncer()
const { fetchUser, invalidate } = useAuth()
const toast = useToast()

const props = defineProps<{
  user: any
}>()

const emit = defineEmits(['updated'])

const oAuthAccounts = computed(() => props.user?.oAuthAccounts ?? { google: false, facebook: false })
const hasOAuthAccounts = computed(() => oAuthAccounts.value.google || oAuthAccounts.value.facebook)

// États locaux au formulaire
const isSaving = ref(false)
const isCurrentVisible = ref(false)
const isPasswordVisible = ref(false)
const isConfirmVisible = ref(false)

const genderOptions = [
  { value: 'male', label: 'Un homme' },
  { value: 'female', label: 'Une femme' }
]

const formState = reactive({
  gender: 'male' as 'male' | 'female',
  firstName: '',
  lastName: '',
  birthDate: '',
  email: '',
  address: '',
  postalCode: '',
  city: '',
  newsletter: false,
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const originalValues = ref({ ...formState })

// Sync initiale et lors des updates user
watch(() => props.user, (newUser) => {
  if (newUser) {
    const values = {
      firstName: newUser.firstName || '',
      lastName: newUser.lastName || '',
      email: newUser.email || '',
      gender: newUser.gender || 'male',
      birthDate: newUser.birthDate || '',
      address: newUser.address || '',
      postalCode: newUser.postalCode || '',
      city: newUser.city || '',
      newsletter: newUser.newsletter || false,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
    Object.assign(formState, values)
    originalValues.value = { ...values }
  }
}, { immediate: true })

const hasChanges = computed(() => {
  const mainFieldsChanged = Object.keys(originalValues.value).some(key => {
    if (['currentPassword', 'newPassword', 'confirmPassword'].includes(key)) return false
    return formState[key as keyof typeof formState] !== originalValues.value[key as keyof typeof originalValues.value]
  })
  return mainFieldsChanged || formState.newPassword.length > 0
})

function resetForm() {
  Object.assign(formState, originalValues.value)
  formState.currentPassword = ''
  formState.newPassword = ''
  formState.confirmPassword = ''
}

async function onSubmit(event: FormSubmitEvent<any>) {
  isSaving.value = true
  try {
    const { currentPassword, newPassword, confirmPassword, ...basePayload } = formState

    // On envoie les passwords seulement si newPassword est renseigné
    const payload = formState.newPassword
        ? { ...basePayload, currentPassword, newPassword, confirmPassword }
        : basePayload

    await $fetch('/api/auth/profile', { method: 'PATCH', body: payload })

    invalidate()
    await fetchUser()
    emit('updated')

    toast.add({
      title: 'Profil mis à jour',
      color: 'green',
      timeout: 5000
    })

    // Reset des champs password uniquement
    formState.currentPassword = ''
    formState.newPassword = ''
    formState.confirmPassword = ''
  } catch (err: any) {
    toast.add({
      title: 'Erreur',
      description: err.data?.message || 'Impossible de mettre à jour le profil',
      color: 'red'
    })
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div>
    <div role="status" aria-live="polite" aria-atomic="true" class="mb-6">
      <div v-if="hasChanges" class="p-4 bg-orange-900/20 border border-orange-800 rounded-lg">
        <div class="flex items-center gap-3">
          <UIcon name="i-heroicons-exclamation-triangle" class="text-orange-400 flex-shrink-0" aria-hidden="true" />
          <p class="text-sm text-orange-300">Enregistrez les modifications pour qu'elles soient prises en compte</p>
        </div>
      </div>
    </div>

    <UForm :schema="profileSchema" :state="formState" class="space-y-6 lg:pb-[10rem]" @submit="onSubmit" @error="onError">
      <!-- Pour que les lecteurs d'écrans annoncent les erreurs -->
      <div ref="errorAnnouncer" aria-live="assertive" aria-atomic="true" class="sr-only"></div>

      <!-- Légende -->
      <p class="mt-8 text-sm italic bold">
        Les champs marqués d'un 
        <span class="text-red-400">*</span> sont obligatoires
      </p>
      <!-- Informations générales -->
      <section>
        <h3 class="text-lg font-semibold mb-6 flex items-center gap-2">
          <UIcon name="i-heroicons-user" />
          Informations générales
        </h3>
        <!-- Genre -->
        <div class="mb-6">
          <UFormGroup name="gender">
            <URadioGroup v-model="formState.gender" :options="genderOptions" color="orange"
                         legend="Vous êtes :"
                         :ui="{
                            wrapper: 'flex flex-row gap-6',
                            fieldset: 'flex flex-row gap-8',
                            legend: 'ttt-form-label'
                         }"
            />
          </UFormGroup>
        </div>

        <!-- Prénom, Nom -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <UFormGroup name="firstName">
            <template #label>
                  <span class="text-sm text-gray-300">
                    Prénom
                    <span class="text-red-400">*</span>
                    <span class="sr-only">(obligatoire)</span>
                  </span>
            </template>
            <UInput v-model="formState.firstName" placeholder="Votre prénom" size="xl" variant="none" class="ttt-input-dark"/>
          </UFormGroup>

          <UFormGroup name="lastName">
            <template #label>
                  <span class="text-sm text-gray-300">
                    Nom
                    <span class="text-red-400">*</span>
                    <span class="sr-only">(obligatoire)</span>
                  </span>
            </template>
            <UInput v-model="formState.lastName" placeholder="Votre nom" size="xl" variant="none" class="ttt-input-dark"/>
          </UFormGroup>
        </div>

        <!-- Date de naissance -->
        <div class="mb-6">
          <UFormGroup name="birthDate">
            <template #label>
                  <span class="text-sm text-gray-300">
                    Date de naissance
                    <span class="text-red-400">*</span>
                    <span class="sr-only">(obligatoire)</span>
                  </span>
            </template>
            <UInput
                v-model="formState.birthDate"
                type="date"
                size="xl"
                variant="none"
                class="ttt-input-dark custom-date-input"
            />
          </UFormGroup>
        </div>

        <!-- Email -->
        <div class="mb-6">
          <UFormGroup name="email">
            <template #label>
                  <span class="text-sm text-gray-300">
                    Adresse email
                    <span class="text-red-400">*</span>
                    <span class="sr-only">(obligatoire)</span>
                  </span>
            </template>
            <UInput
                v-model="formState.email"
                type="email"
                placeholder="votre@email.com"
                icon="i-heroicons-envelope"
                size="xl"
                variant="none"
                class="ttt-input-dark"
            />
          </UFormGroup>
        </div>

        <!-- Adresse postale -->
        <div class="mb-6">
          <UFormGroup name="address">
            <template #label>
              <span class="text-sm text-gray-300">Adresse postale</span>
            </template>
            <UInput
                v-model="formState.address"
                placeholder="N° et nom de rue"
                size="xl"
                variant="none"
                class="ttt-input-dark"
            />
          </UFormGroup>
        </div>

        <!-- Code postal et Ville -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UFormGroup name="postalCode" class="md:col-span-1">
            <template #label>
              <span class="text-sm text-gray-300">Code postal</span>
            </template>
            <UInput
                v-model="formState.postalCode"
                placeholder="Ex: 75001"
                size="xl"
                variant="none"
                class="ttt-input-dark"
            />
          </UFormGroup>

          <UFormGroup name="city" class="md:col-span-2">
            <template #label>
              <span class="text-sm text-gray-300">Ville</span>
            </template>
            <UInput
                v-model="formState.city"
                placeholder="Votre ville"
                autocomplete="city"
                size="xl"
                variant="none"
                class="ttt-input-dark"
            />
          </UFormGroup>
        </div>
      </section>

      <!-- Préférences -->
      <section>
        <h3 class="text-lg font-semibold mb-6 flex items-center gap-2">
          <UIcon name="i-heroicons-bell" />
          Préférences
        </h3>

        <UCheckbox
            v-model="formState.newsletter"
            label="J'accepte de recevoir la newsletter Thé Tip Top"
            color="orange"
            :ui="{ label: 'text-base text-gray-300' }"
        />
      </section>

      <!-- Informations du compte -->
      <section>
        <h3 class="text-lg font-semibold mb-6 flex items-center gap-2">
          <UIcon name="i-heroicons-key" />
          Sécurité du compte
        </h3>

        <!-- Changement de mot de passe -->
        <template v-if="!hasOAuthAccounts">
          <div class="space-y-6 p-6 bg-gray-900/50 rounded-lg border border-gray-800" aria-labelledby="password-section-title">
            <h4 id="password-section-title" class="text-1xl font-medium">
              Changer le mot de passe (optionnel)
            </h4>
            <p id="password-section-hint" class="text-base text-gray-300 italic">
              Laissez ces champs vides si vous ne souhaitez pas modifier votre mot de passe.
            </p>
            <div class="grid grid-cols-1 gap-6">
              <!-- Mot de passe actuel -->
              <UFormGroup name="currentPassword">
                <template #label>
                      <span class="text-sm text-white">
                        Mot de passe actuel
                      </span>
                </template>
                <UInput
                    v-model="formState.currentPassword"
                    :type="isCurrentVisible ? 'text' : 'password'"
                    autocomplete="current-password"
                    placeholder="Saisir votre mot de passe actuel"
                    aria-describedby="password-section-hint"
                    icon="i-heroicons-lock-closed"
                    size="xl"
                    variant="none"
                    class="ttt-input-dark"
                    :ui="{ icon: { trailing: { pointer: 'pointer-events-auto' } } }"
                >
                  <template #trailing>
                    <UButton
                        color="gray"
                        variant="ghost"
                        :icon="isCurrentVisible ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                        :aria-label="isCurrentVisible ? 'Masquer le mot de passe actuel' : 'Afficher le mot de passe actuel'"
                        :padded="false"
                        @click="isCurrentVisible = !isCurrentVisible"
                        class="text-gray-400 hover:text-white hover:bg-transparent mr-2"
                    />
                  </template>
                </UInput>
              </UFormGroup>

              <!-- Nouveau mot de passe -->
              <UFormGroup name="newPassword">
                <template #label>
                      <span class="text-sm text-white">
                        Nouveau mot de passe
                      </span>
                </template>
                <UInput
                    v-model="formState.newPassword"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    placeholder="8 caractères minimum"
                    aria-describedby="password-section-hint"
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
                        :aria-label="isPasswordVisible ? 'Masquer le nouveau mot de passe' : 'Afficher le nouveau mot de passe'"
                        :padded="false"
                        @click="isPasswordVisible = !isPasswordVisible"
                        class="text-gray-400 hover:text-white hover:bg-transparent mr-2"
                    />
                  </template>
                </UInput>
              </UFormGroup>

              <!-- Confirmation -->
              <UFormGroup name="confirmPassword">
                <template #label>
                      <span class="text-sm text-white">
                        Confirmer le mot de passe
                      </span>
                </template>
                <UInput
                    v-model="formState.confirmPassword"
                    :type="isConfirmVisible ? 'text' : 'password'"
                    placeholder="Confirmer votre nouveau mot de passe"
                    aria-describedby="password-section-hint"
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
                        :icon="isConfirmVisible ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                        :aria-label="isConfirmVisible ? 'Masquer le nouveau mot de passe confirmé' : 'Afficher le nouveau mot de passe confirmé'"
                        :padded="false"
                        @click="isConfirmVisible = !isConfirmVisible"
                        class="text-gray-400 hover:text-white hover:bg-transparent mr-2"
                    />
                  </template>
                </UInput>
              </UFormGroup>
            </div>

            <p class="text-sm text-gray-200 italic">
              Le mot de passe doit contenir au moins 8 caractères
            </p>
          </div>
        </template>

        <!-- Message pour users OAuth -->
        <div v-else class="p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
          <div class="flex items-start gap-3">
            <UIcon name="i-heroicons-information-circle" class="text-blue-400 flex-shrink-0 mt-0.5" />
            <div class="text-sm text-blue-300">
              <p class="font-medium mb-1">Compte OAuth</p>
              <p class="text-blue-400">
                Vous êtes connecté via un fournisseur externe (Google/Facebook).
                Le changement de mot de passe n'est pas disponible pour ce type de compte.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Comptes liés -->
      <section v-if="hasOAuthAccounts">
        <h3 class="text-lg font-semibold mb-6 flex items-center gap-2">
          <UIcon name="i-heroicons-link" />
          Comptes liés
        </h3>

        <div class="space-y-4">
          <div v-if="oAuthAccounts.google" class="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-800">
            <div class="flex items-center gap-3">
              <img src="/images/google-logo.svg" alt="Google" class="w-6 h-6" />
              <span class="text-sm">Google</span>
            </div>
            <UBadge color="green" variant="subtle">Lié</UBadge>
          </div>

          <div v-if="oAuthAccounts.facebook" class="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-800">
            <div class="flex items-center gap-3">
              <img src="/images/facebook-logo.svg" alt="Facebook" class="w-6 h-6" />
              <span class="text-sm">Facebook</span>
            </div>
            <UBadge color="green" variant="subtle">Lié</UBadge>
          </div>
        </div>
      </section>
      <div class="mt-2 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center sm:justify-end gap-4">
        <UButton
            color="gray"
            variant="ghost"
            class="w-full sm:w-auto px-6 justify-center"
            :disabled="!hasChanges || isSaving"
            @click="resetForm"
        >
          Annuler les modifications
        </UButton>
        <UButton
            type="submit"
            variant="solid"
            color="white"
            class="btn-primary w-full sm:w-auto text-white dark:text-white font-semibold"
            :disabled="!hasChanges"
            :loading="isSaving"
        >
          <UIcon name="i-heroicons-check" class="mr-2 font-semibold" />
          Enregistrer le profil
        </UButton>
      </div>
    </UForm>

  </div>
</template>

<style scoped>
:deep(.u-form-group-label) { @apply mb-2 block; }
section { @apply !m-0 !py-6; }
</style>