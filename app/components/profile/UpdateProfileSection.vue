<script setup lang="ts">
const { user, logout } = useAuth()

const fullName = computed(() => {
  if (!user.value) return ''
  return `${user.value.firstName} ${user.value.lastName}`.trim()
})
</script>

<template>
  <section class="min-h-screen bg-gradient-ttt-dark-reverse-subtle text-white px-8">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-4xl font-bold text-center mb-2">Votre profil</h2>
      <p class="text-center mb-8">
        Modifiez vos informations ci-dessous, puis cliquez sur "Enregistrer le profil"
      </p>

      <ClientOnly>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12 border-b border-gray-800 pb-6 gap-4">
          <div>
            <h3 class="text-2xl font-bold">{{ fullName || 'Utilisateur' }}</h3>
            <UBadge v-if="user?.hasOAuthAccounts" color="blue" variant="subtle" size="xs" class="mt-1">
              <UIcon name="i-heroicons-shield-check" class="mr-1" /> Compte OAuth
            </UBadge>
          </div>

          <UButton @click="logout" variant="ghost" color="red" icon="i-heroicons-arrow-left-on-rectangle" class="self-start sm:self-auto">
            Se déconnecter
          </UButton>
        </div>


        <ProfileForm v-if="user" :user="user" />
        <div v-else class="flex justify-center py-12">
          <UIcon name="i-heroicons-arrow-path" class="animate-spin text-3xl text-orange-500" />
        </div>
      </ClientOnly>
    </div>
  </section>
</template>