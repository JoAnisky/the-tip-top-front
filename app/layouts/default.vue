<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow">
      <slot />
    </main>
  </div>
  <NavFooter/>
</template>
<script setup lang="ts">
</script>