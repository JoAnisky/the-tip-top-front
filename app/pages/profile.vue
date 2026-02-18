<script setup lang="ts">

definePageMeta({
  middleware: ['auth']
})

import GameSection from "~/components/profile/GameSection.vue";
import GainHistorySection from "~/components/profile/GainHistorySection.vue";
import UpdateProfileSection from "~/components/profile/UpdateProfileSection.vue";

</script>

<template>
  <GameSection/>
  <GainHistorySection/>
  <UpdateProfileSection/>
</template>