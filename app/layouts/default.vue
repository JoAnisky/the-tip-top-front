<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow overflow-x-hidden relative">
      <slot />
      <UNotifications />
    </main>
    <NavFooter/>
  </div>

</template>