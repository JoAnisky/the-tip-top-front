<script setup lang="ts">
import { useGifts } from '~/composables/useGifts'

const props = defineProps<{
  gains: UserGain[]
}>()

const { getGiftById } = useGifts()

function formatDate(isoDate: string): string {
  const date = new Date(isoDate)
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>

<template>
  <div class="gains-history">
    <div class="gains-table">
      <!-- Header -->
      <div class="table-header">
        <div class="col-gain">Gain/Date</div>
        <div class="col-code">Code</div>
        <div class="col-status">Statut</div>
      </div>

      <!-- Rows -->
      <div v-for="gain in gains" :key="gain.id" class="table-row" :class="gain.isClaimed ? 'row-claimed' : ''">
        <!-- Colonne Gain/Date -->
        <div class="col-gain">
          <img v-if="getGiftById(gain.gainId)" :src="getGiftById(gain.gainId)!.image" alt="" class="gain-image"/>
          <div class="gain-info">
            <p class="gain-name">{{ gain.gainName }}</p>
            <p class="gain-date">{{ formatDate(gain.validatedOn) }}</p>
          </div>
        </div>

        <!-- Colonne Code -->
        <div class="col-code">
          <span class="code-value">{{ gain.code }}</span>
        </div>

        <!-- Colonne Statut -->
        <div class="col-status">
          <span v-if="gain.isClaimed" class="status-badge status-claimed">
            Récupéré
          </span>
          <span v-else class="status-badge status-pending">
            A récupérer
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./ProfileGainsHistory.scss" />