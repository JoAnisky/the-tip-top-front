<script setup lang="ts">
const { playLink } = usePlayLink()

const resolvedLink = ref('/login')

onMounted(() => {
  resolvedLink.value = playLink.value
})
</script>

<template>
    <NuxtLink
        :to="resolvedLink"
        class="btn-primary"
        aria-label="Participer au jeu concours Thé Tip Top"
    >
      Jouer
    </NuxtLink>
</template>