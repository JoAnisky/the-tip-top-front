<script setup lang="ts">
import ExportCSVSection from "~/components/admin/ExportCSVSection.vue";

definePageMeta({
  middleware: ['auth', 'role'],
  role: 'ROLE_ADMIN',
})
</script>

<template>
  <div class="bg-gradient-ttt-dark text-white p-4 md:px-[6rem] min-h-screen">
    <h1 class="text-2xl font-bold mb-8 text-ttt-orange">Dashboard Admin</h1>
    <ExportCSVSection/>
    <AdminDashboard />
  </div>
</template>