<script setup lang="ts">
import CookieBanner from "~/components/cookies/CookieBanner.vue";
import CookieBtn from "~/components/cookies/CookieBtn.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow relative flex-1">
      <slot />
      <UNotifications />
    </main>
    <NavFooter/>
  </div>
  <CookieBanner />
  <CookieBtn/>
</template>
