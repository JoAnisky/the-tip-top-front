<script setup lang="ts">
const { loggedIn } = useAuth()

const playLink = computed(() => loggedIn.value ? '/profile' : '/login')
</script>

<template>
  <NuxtLink
      :to="playLink"
      class="btn-primary"
      aria-label="Participer au jeu concours Thé Tip Top"
  >
    Jouer
  </NuxtLink>
</template>