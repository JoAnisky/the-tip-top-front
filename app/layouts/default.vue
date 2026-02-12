<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow relative">
      <slot />
      <UNotifications />
    </main>
    <NavFooter/>
  </div>

</template>