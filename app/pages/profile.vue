<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

import Game from "~/components/profile/Game.vue";
import UpdateProfileForm from "~/components/profile/UpdateProfileForm.vue";
</script>

<template>
  <Game/>
  <UpdateProfileForm/>
</template>