<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
import UpdateProfileForm from "~/components/register/UpdateProfileForm.vue";
</script>

<template>
    <UpdateProfileForm/>
</template>