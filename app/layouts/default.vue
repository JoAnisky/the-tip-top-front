<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden">
    <Navbar />
    <main class="flex-grow overflow-x-hidden">
      <slot />
    </main>
    <NavFooter/>
  </div>

</template>