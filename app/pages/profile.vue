<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

useSeoPage({
  title: 'Mon espace personnel — Jeu-concours Thé Tip Top',
  description: 'Accédez à votre espace personnel Thé Tip Top : saisissez vos codes de participation, consultez vos gains et gérez les informations de votre compte.',
  noindex: true,
})

import GameSection from "~/components/profile/GameSection.vue";
import GainHistorySection from "~/components/profile/GainHistorySection.vue";
import UpdateProfileSection from "~/components/profile/UpdateProfileSection.vue";

const { user } = useAuth();

const isParticipant = computed(() =>
    !user.value?.roles?.includes('ROLE_EMPLOYEE') &&
    !user.value?.roles?.includes('ROLE_ADMIN')
)

</script>

<template>
  <template v-if="isParticipant">
    <GameSection/>
    <GainHistorySection/>
  </template>
  <UpdateProfileSection/>
</template>