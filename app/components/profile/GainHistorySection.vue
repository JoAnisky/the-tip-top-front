<script setup lang="ts">
import ProfileGainsHistory from "~/components/profile/gains-history/ProfileGainsHistory.vue";

const { user } = useAuth()
</script>

<template>
  <section id="game" class="bg-ttt-green-light">
    <div class="ttt-container">
      <h2 class="text-4xl font-bold text-center mb-2 text-ttt-white">Historique de vos gains</h2>
      <div class="flex subtitle relative z-10">
        <p class="mb-8 text-white text-center">
          Retrouvez ici la liste de vos lots, si le lot est récupéré ou à récupérer et la date du gain.
        </p>
      </div>

      <!-- Empty state SI pas de gains -->
      <div v-if="!user?.gains || user.gains.length === 0" class="text-center py-8">
        <p class="text-white">
          Vous n'avez pas encore participé au jeu concours 😢
        </p>
        <p class="text-white">
          Rendez vous vite en magasin et effectuez un achat d'un montant minimum de 49€ pour tenter votre chance !
        </p>
      </div>

      <!-- Tableau SI des gains existent -->
      <ProfileGainsHistory v-else :gains="user.gains" />
    </div>
  </section>
</template>