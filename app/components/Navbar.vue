<script setup lang="ts">
  const activeHash  = useActiveSection()
</script>

<template>
  <nav class="sticky top-0 w-full z-50 flex items-center justify-between px-[var(--navbar-gutter)] h-20 bg-ttt-black/70 backdrop-blur-md">
      <NuxtLink to="/" class="flex-shrink-0">
        <img src="/images/the_tip_top_logo_header.svg" alt="Logo Thé Tip Top" class="w-[183px] h-[36px] object-contain">
      </NuxtLink>

      <ul class="flex items-center gap-8 font-lato text-ttt-white">
        <li><NuxtLink to="/" class="nav-link" :class="{ 'is-active' : activeHash === '' || activeHash === '#' }">Accueil</NuxtLink></li>
        <li><NuxtLink to="/#howto" class="nav-link" :class="{ 'is-active' : activeHash === '#howto' }">Comment jouer</NuxtLink></li>
        <li><NuxtLink to="/#faq" class="nav-link" :class="{ 'is-active' : activeHash === '#faq' }">Foire aux questions</NuxtLink></li>
        <li><NuxtLink to="/about" class="nav-link">Qui sommes nous ?</NuxtLink></li>

        <li class="ml-4">
          <NuxtLink to="/login">
            <button class="flex items-center hover:scale-105 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
                <g clip-path="url(#clip0_132_363)">
                  <circle cx="15" cy="16" r="15" fill="#DD6835"/>
                  <path d="M15 6C14.0111 6 13.0444 6.29324 12.2221 6.84265C11.3999 7.39206 10.759 8.17295 10.3806 9.08658C10.0022 10.0002 9.90315 11.0055 10.0961 11.9755C10.289 12.9454 10.7652 13.8363 11.4645 14.5355C12.1637 15.2348 13.0546 15.711 14.0245 15.9039C14.9945 16.0969 15.9998 15.9978 16.9134 15.6194C17.827 15.241 18.6079 14.6001 19.1573 13.7779C19.7068 12.9556 20 11.9889 20 11C20 9.67392 19.4732 8.40215 18.5355 7.46447C17.5979 6.52678 16.3261 6 15 6ZM15 14C14.4067 14 13.8266 13.8241 13.3333 13.4944C12.8399 13.1648 12.4554 12.6962 12.2284 12.1481C12.0013 11.5999 11.9419 10.9967 12.0576 10.4147C12.1734 9.83279 12.4554 9.29824 12.8787 8.87868C13.2982 8.45912 13.8328 8.1734 14.4147 8.05764C14.9967 7.94189 15.5999 8.0013 16.1481 8.22836C16.6962 8.45542 17.1648 8.83994 17.4944 9.33329C17.8241 9.82664 18 10.4067 18 11C18 11.7956 17.6839 12.5587 17.1213 13.1213C16.5587 13.6839 15.7956 14 15 14ZM24 25V24C24 22.1435 23.2625 20.363 21.9497 19.0503C20.637 17.7375 18.8565 17 17 17H13C11.1435 17 9.36301 17.7375 8.05025 19.0503C6.7375 20.363 6 22.1435 6 24V25H8V24C8 22.6739 8.52678 21.4021 9.46447 20.4645C10.4021 19.5268 11.6739 19 13 19H17C18.3261 19 19.5979 19.5268 20.5355 20.4645C21.4732 21.4021 22 22.6739 22 24V25H24Z" fill="#FCFAF9"/>
                </g>
                <defs>
                  <clipPath id="clip0_132_363">
                    <rect width="30" height="31" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </button>
          </NuxtLink>
        </li>
      </ul>
    </nav>
</template>

<style lang="scss" scoped>
.nav-link {
  @apply transition-all relative py-2 hover:text-ttt-orange;

  &::after {
    content: '';
    @apply absolute bottom-[-4px] left-0 w-0 h-0.5 bg-ttt-orange transition-all duration-300;
  }

  &.is-active,
  &.router-link-exact-active:not([href^="/#"]):not([href="/"]) {
    @apply text-ttt-orange;
    &::after {
      @apply w-full;
    }
  }
}
</style>