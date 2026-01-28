<script setup lang="ts">
const route = useRoute()

// Afficher le background partout SAUF sur la home
const isHomePage = computed(() => route.path === '/')
</script>

<template>
  <!--  Si ce n'est pas la homepage, on affiche l'image de section et le bouton cookie en haut du NavFooter -->
  <div v-if="!isHomePage" class="w-full relative bg-ttt-green-light">
    <CookiesBtn class="relative z-10" />
    <img src="/images/univers-ttt-background.webp" alt="" aria-hidden="true" class="absolute bottom-0 left-0 w-full object-cover pointer-events-none z-0"/>
  </div>
  <!-- Sur la home : NavFooter uniquement -->
  <footer class="w-full bg-ttt-black/70 py-6">
    <nav class="flex justify-center items-center">
      <ul class="flex flex-wrap justify-center items-center font-lato text-ttt-white text-sm uppercase tracking-wider gap-[5.5rem]">
        <li class="nav-footer-item">
          <NuxtLink to="/reglement" class="nav-footer-link">Règlement du jeu</NuxtLink>
        </li>
        <li class="nav-footer-item">
          <NuxtLink to="/mentions-legales" class="nav-footer-link">Mentions légales et CGU</NuxtLink>
        </li>
        <li class="nav-footer-item">
          <NuxtLink to="/cookies" class="nav-footer-link">Politique de cookies</NuxtLink>
        </li>
        <li class="nav-footer-item">
          <NuxtLink to="/contact" class="nav-footer-link">Contact</NuxtLink>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<style scoped lang="scss">
  .nav-footer-item {
    display: flex;
    align-items: center;
    position: relative;

    // on place le pipe avant chaque élément sauf le premier
    &:not(:first-child)::before {
      content: "|";
      position: absolute;
      /* centrage parfait : gap des ul : 5.5rem / 2 = 2.75rem */
      left: -2.75rem;
      // centre le caractère lui-même pour compenser sa propre largeur
      transform: translateX(-50%);

      @apply text-ttt-white/30 font-extralight;
      pointer-events: none;
    }
  }

  .nav-footer-link {
    @apply hover:text-ttt-orange transition-colors duration-300;
  }

  // sécu pour le responsive : si l'écran est trop petit pour 5.5rem de gap
  @media (max-width: 1024px) {
    ul {
      gap: 2rem !important; // réduit le gap
    }
    .nav-footer-item:not(:first-child)::before {
      left: -1rem; // réajuste le pipe (2rem / 2)
    }
  }

  @media (max-width: 640px) {
    ul {
      gap: 0.5rem !important; // réduit le gap car la ligne occupe de l'espace
      flex-direction: column;
      width: 100%;
      align-items: center;
    }

    .nav-footer-item {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      // cache définitivement le pipe vertical
      &::before {
        display: none !important;
      }

      // ajoute la séparation horizontale après chaque item sauf le dernier
      &:not(:last-child)::after {
        content: "";
        display: block;
        width: 40px; // largeur de la ligne de séparation
        height: 1px;
        @apply bg-ttt-white/50 my-3;
        border-radius: 2px;
      }
    }

    .nav-footer-link {
      @apply py-2 text-center w-full;
    }
  }
</style>
