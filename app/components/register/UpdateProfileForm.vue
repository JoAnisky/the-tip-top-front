<script setup lang="ts">
import { registerSchema } from "#imports";
import type { FormSubmitEvent } from '#ui/types'

const { user, fetchSession, logout } = useAuth()
const toast = useToast()

// État
const isSaving = ref(false)
const isPasswordVisible = ref(false)
const isConfirmVisible = ref(false)
const hasOAuthAccounts = ref(false)

// Charger les infos complètes du user
const fetchUserDetails = async () => {
  try {
    const response = await $fetch('/api/auth/me')
    hasOAuthAccounts.value = response.hasOAuthAccounts || false
  } catch (err) {
    console.error('Erreur chargement user:', err)
  }
}

onMounted(() => {
  fetchUserDetails()
})

const genderOptions = [
  { value: 'male', label: 'Un homme' },
  { value: 'female', label: 'Une femme' }
]

// État du formulaire avec valeurs initiales
const formState = reactive({
  gender: 'male' as 'male' | 'female',
  firstName: '',
  lastName: '',
  birthdate: '',
  email: '',
  address: '',
  postalCode: '',
  city: '',
  newsletter: false,
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Valeurs originales pour détecter les changements
const originalValues = ref({ ...formState })

// Initialiser avec les données user
watch(user, (newUser) => {
  if (newUser) {
    const values = {
      firstName: newUser.firstName || '',
      lastName: newUser.lastName || '',
      email: newUser.email || '',
      gender: newUser.gender || 'male',
      birthdate: newUser.birthdate || '',
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

// Détecter si le formulaire a été modifié
const hasChanges = computed(() => {
  // Comparer les champs principaux
  const mainFieldsChanged =
      formState.firstName !== originalValues.value.firstName ||
      formState.lastName !== originalValues.value.lastName ||
      formState.email !== originalValues.value.email ||
      formState.gender !== originalValues.value.gender ||
      formState.birthdate !== originalValues.value.birthdate ||
      formState.address !== originalValues.value.address ||
      formState.postalCode !== originalValues.value.postalCode ||
      formState.city !== originalValues.value.city ||
      formState.newsletter !== originalValues.value.newsletter

  // Ou si un nouveau mot de passe est saisi
  const passwordChanged = formState.newPassword.length > 0

  return mainFieldsChanged || passwordChanged
})

// Réinitialiser le formulaire
function resetForm() {
  Object.assign(formState, originalValues.value)
  formState.currentPassword = ''
  formState.newPassword = ''
  formState.confirmPassword = ''
}

async function onSubmit(event: FormSubmitEvent<any>) {
  isSaving.value = true

  try {
    const payload: any = {
      gender: formState.gender,
      firstName: formState.firstName,
      lastName: formState.lastName,
      birthdate: formState.birthdate,
      email: formState.email,
      address: formState.address || null,
      postalCode: formState.postalCode || null,
      city: formState.city || null,
      newsletter: formState.newsletter
    }

    if (formState.newPassword) {
      payload.currentPassword = formState.currentPassword
      payload.newPassword = formState.newPassword
    }

    await $fetch('/api/auth/profile', {
      method: 'PATCH',
      body: payload
    })

    await fetchSession()

    toast.add({
      title: 'Profil mis à jour',
      description: 'Vos informations ont été enregistrées avec succès',
      color: 'green',
      timeout: 5000
    })

    // Mettre à jour les valeurs originales
    originalValues.value = {
      ...formState,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }

    // Réinitialiser les champs de mot de passe
    formState.currentPassword = ''
    formState.newPassword = ''
    formState.confirmPassword = ''

  } catch (err: any) {
    console.error('Erreur de mise à jour :', err)

    toast.add({
      title: 'Erreur',
      description: err.data?.message || err.message || 'Impossible de mettre à jour le profil',
      color: 'red',
      timeout: 5000
    })
  } finally {
    isSaving.value = false
  }
}

async function onLogout() {
  await logout()
}

const fullName = computed(() => {
  if (!user.value) return ''
  return `${user.value.firstName} ${user.value.lastName}`.trim()
})

</script>

<template>
  <div class="min-h-screen bg-[#121212] text-white p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-center mb-2">Votre profil</h1>
      <p class="text-center mb-8">
        Modifiez vos informations ci-dessous, puis cliquez sur "Enregistrer"
      </p>

      <!-- En-tête avec nom -->
      <div class="flex items-center justify-between mb-12 flex-wrap gap-4">
        <div>
          <h2 class="text-xl font-semibold">{{ fullName || 'Utilisateur' }}</h2>
          <UButton
              @click="onLogout"
              variant="link"
              color="red"
              :padded="false"
              class="text-sm italic hover:text-red-400 transition-colors"
              icon="i-heroicons-arrow-left-on-rectangle"
          >
            Se déconnecter
          </UButton>

          <div v-if="hasOAuthAccounts" class="mt-2">
            <UBadge color="blue" variant="subtle">
              <UIcon name="i-heroicons-shield-check" class="mr-1" />
              Compte lié via OAuth
            </UBadge>
          </div>
        </div>

        <!-- Boutons d'action - toujours visibles -->
        <div class="flex gap-3">
          <UButton
              color="gray"
              variant="outline"
              class="rounded-lg px-6"
              :disabled="!hasChanges"
              @click="resetForm"
          >
            <UIcon name="i-heroicons-arrow-path" class="mr-2" />
            Annuler
          </UButton>

          <UButton
              type="submit"
              form="profile-form"
              variant="solid"
              class="btn-primary text-white dark:text-white font-semibold"
              :disabled="!hasChanges"
              :loading="isSaving"
              :ui="{
                color: 'white'
              }"
          >
            <UIcon name="i-heroicons-check" class="mr-2 font-semibold" />
            Enregistrer
          </UButton>
        </div>
      </div>

      <!-- Indicateur de modifications non enregistrées -->
      <div v-if="hasChanges" class="mb-6 p-4 bg-orange-900/20 border border-orange-800 rounded-lg">
        <div class="flex items-center gap-3">
          <UIcon name="i-heroicons-exclamation-triangle" class="text-orange-400 flex-shrink-0" />
          <p class="text-sm text-orange-300">
            Vous avez des modifications non enregistrées
          </p>
        </div>
      </div>

      <!-- Formulaire -->
      <UForm id="profile-form" :schema="registerSchema" :state="formState" class="space-y-12" @submit="onSubmit">
        <!-- Informations générales -->
        <section>
          <h3 class="text-lg font-semibold mb-6 flex items-center gap-2">
            <UIcon name="i-heroicons-user" />
            Informations générales
          </h3>

          <!-- Genre -->
          <div class="mb-6">
            <UFormGroup label="Vous êtes :" name="gender">
              <template #label>
                <span class="block mb-2 text-sm text-gray-300">
                  Vous êtes : <span class="text-red-500">*</span>
                </span>
              </template>
              <URadioGroup v-model="formState.gender" :options="genderOptions" color="orange" :ui="{
                  wrapper: 'flex flex-row gap-8',
                  fieldset: 'flex flex-row gap-8'
                }"/>
            </UFormGroup>
          </div>

          <!-- Prénom, Nom -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <UFormGroup name="firstName">
              <template #label>
                <span class="text-sm text-gray-300">
                  Prénom <span class="text-red-500">*</span>
                </span>
              </template>
              <UInput v-model="formState.firstName" placeholder="Votre prénom" size="xl" variant="none" class="ttt-input-dark"/>
            </UFormGroup>

            <UFormGroup name="lastName">
              <template #label>
                <span class="text-sm text-gray-300">
                  Nom <span class="text-red-500">*</span>
                </span>
              </template>
              <UInput v-model="formState.lastName" placeholder="Votre nom" size="xl" variant="none" class="ttt-input-dark"/>
            </UFormGroup>
          </div>

          <!-- Date de naissance -->
          <div class="mb-6">
            <UFormGroup name="birthdate">
              <template #label>
                <span class="text-sm text-gray-300">
                  Date de naissance <span class="text-red-500">*</span>
                </span>
              </template>
              <UInput
                  v-model="formState.birthdate"
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
                  Adresse email <span class="text-red-500">*</span>
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
            <div class="space-y-6 p-6 bg-gray-900/50 rounded-lg border border-gray-800">
              <h4 class="text-sm font-medium text-gray-400">
                Changer le mot de passe (optionnel)
              </h4>

              <div class="grid grid-cols-1 gap-6">
                <!-- Mot de passe actuel -->
                <UFormGroup name="currentPassword">
                  <template #label>
                    <span class="text-sm text-gray-300">
                      Mot de passe actuel
                    </span>
                  </template>
                  <UInput
                      v-model="formState.currentPassword"
                      type="password"
                      placeholder="Saisir votre mot de passe actuel"
                      icon="i-heroicons-lock-closed"
                      size="xl"
                      variant="none"
                      class="ttt-input-dark"
                  />
                </UFormGroup>

                <!-- Nouveau mot de passe -->
                <UFormGroup name="newPassword">
                  <template #label>
                    <span class="text-sm text-gray-300">
                      Nouveau mot de passe
                    </span>
                  </template>
                  <UInput
                      v-model="formState.newPassword"
                      :type="isPasswordVisible ? 'text' : 'password'"
                      placeholder="8 caractères minimum"
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

                <!-- Confirmation -->
                <UFormGroup name="confirmPassword">
                  <template #label>
                    <span class="text-sm text-gray-300">
                      Confirmer le mot de passe
                    </span>
                  </template>
                  <UInput
                      v-model="formState.confirmPassword"
                      :type="isConfirmVisible ? 'text' : 'password'"
                      placeholder="Confirmer votre nouveau mot de passe"
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
                          :padded="false"
                          @click="isConfirmVisible = !isConfirmVisible"
                          class="text-gray-400 hover:text-white hover:bg-transparent mr-2"
                      />
                    </template>
                  </UInput>
                </UFormGroup>
              </div>

              <p class="text-xs text-gray-500 italic">
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
            <div class="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-800">
              <div class="flex items-center gap-3">
                <img src="/images/google-logo.svg" alt="Google" class="w-6 h-6" />
                <span class="text-sm">Google</span>
              </div>
              <UBadge color="green" variant="subtle">Lié</UBadge>
            </div>

            <div class="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-800">
              <div class="flex items-center gap-3">
                <img src="/images/facebook-logo.svg" alt="Facebook" class="w-6 h-6" />
                <span class="text-sm">Facebook</span>
              </div>
              <UBadge color="green" variant="subtle">Lié</UBadge>
            </div>
          </div>
        </section>
      </UForm>

      <!-- Légende -->
      <p class="mt-8 text-sm text-gray-500 italic text-center">
        Les champs marqués d'un <span class="text-red-500">*</span> sont obligatoires
      </p>
    </div>
  </div>
</template>

<style scoped>
.ttt-input-dark {
  @apply bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500;
}

.custom-date-input input[type="date"] {
  @apply text-white;
}

.custom-date-input input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
section {
  @apply !m-0 !py-6
}
</style>