<script setup lang="ts">
const { playLink } = usePlayLink()

</script>

<template>
  <ClientOnly>
    <NuxtLink
        :to="playLink"
        class="btn-primary"
        aria-label="Participer au jeu concours Thé Tip Top"
    >
      Jouer
    </NuxtLink>
  </ClientOnly>
</template>