<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

const { user, loggedIn } = useUserSession()

// Debug
console.log('Page profile chargée')
console.log('loggedIn:', loggedIn.value)
console.log('user:', user.value)
</script>

<template>
  <div class="min-h-screen bg-ttt-dark-grey p-8">
    <div class="max-w-4xl mx-auto">
      <UCard>
        <template #header>
          <h1 class="text-2xl font-bold">Mon Profil</h1>
        </template>

        <div v-if="loggedIn && user" class="space-y-4">
          <div>
            <p class="text-sm text-gray-500">Nom complet</p>
            <p class="text-lg font-semibold">{{ user.firstName }} {{ user.lastName }}</p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Email</p>
            <p class="text-lg">{{ user.email }}</p>
          </div>

          <div v-if="user.roles">
            <p class="text-sm text-gray-500">Rôles</p>
            <div class="flex gap-2 mt-1">
              <UBadge v-for="role in user.roles" :key="role" color="primary">
                {{ role }}
              </UBadge>
            </div>
          </div>

          <UDivider class="my-6" />

          <div class="flex gap-4">
            <UButton
                color="red"
                variant="outline"
                @click="navigateTo('/logout')"
            >
              Se déconnecter
            </UButton>
          </div>
        </div>

        <div v-else class="space-y-4">
          <p>Chargement de votre profil...</p>
        </div>
      </UCard>
    </div>
  </div>
</template>