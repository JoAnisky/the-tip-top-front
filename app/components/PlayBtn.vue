<script setup lang="ts">
const { playLink } = usePlayLink()

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