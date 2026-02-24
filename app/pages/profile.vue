<script setup lang="ts">

definePageMeta({
  middleware: ['auth']
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