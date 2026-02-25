<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow relative flex-1">
      <slot />
      <UNotifications />
    </main>
    <NavFooter/>
  </div>
  <CookiesBtn/>

</template>
<script setup lang="ts">
</script>