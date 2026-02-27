<script setup lang="ts">
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const { stats, loading, error, fetchStats } = useAdminStats()

const gainsChartRef  = ref<HTMLCanvasElement | null>(null)
const genderChartRef = ref<HTMLCanvasElement | null>(null)
const ageChartRef    = ref<HTMLCanvasElement | null>(null)

let gainsChart: Chart | null = null
let genderChart: Chart | null = null
let ageChart:    Chart | null = null

const GAIN_COLORS = [
  'rgba(20, 184, 166, 0.8)',
  'rgba(99, 102, 241, 0.8)',
  'rgba(251, 146, 60, 0.8)',
  'rgba(52, 211, 153, 0.8)',
  'rgba(167, 139, 250, 0.8)',
]

const GENDER_COLORS = [
  'rgba(99, 102, 241, 0.8)',
  'rgba(20, 184, 166, 0.8)',
  'rgba(251, 146, 60, 0.8)',
]

const GENDER_LABELS: Record<string, string> = {
  male:   'Homme',
  female: 'Femme',
  other:  'Autre',
}

const CHART_SCALES = {
  x: { ticks: { color: '#cbd5e1' }, grid: { color: 'rgba(255,255,255,0.05)' } },
  y: { ticks: { color: '#cbd5e1' }, grid: { color: 'rgba(255,255,255,0.05)' } },
}

function buildCharts(data: AdminStats) {
  gainsChart?.destroy()
  genderChart?.destroy()
  ageChart?.destroy()

  if (gainsChartRef.value) {
    gainsChart = new Chart(gainsChartRef.value, {
      type: 'bar',
      data: {
        labels: data.gains.map(g => g.gain_name),
        datasets: [{ label: 'Lots gagnés', data: data.gains.map(g => g.total), backgroundColor: GAIN_COLORS, borderRadius: 6 }],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: CHART_SCALES },
    })
  }

  if (genderChartRef.value) {
    genderChart = new Chart(genderChartRef.value, {
      type: 'doughnut',
      data: {
        labels: data.winners.gender.map(w => GENDER_LABELS[w.gender] ?? w.gender),
        datasets: [{ data: data.winners.gender.map(w => w.total), backgroundColor: GENDER_COLORS, borderWidth: 0 }],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#cbd5e1', padding: 16 } } } },
    })
  }

  if (ageChartRef.value) {
    ageChart = new Chart(ageChartRef.value, {
      type: 'bar',
      data: {
        labels: data.winners.age_groups.map(a => a.label),
        datasets: [{ label: 'Gagnants', data: data.winners.age_groups.map(a => a.total), backgroundColor: 'rgba(20, 184, 166, 0.8)', borderRadius: 6 }],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: CHART_SCALES },
    })
  }
}

onMounted(async () => {
  await fetchStats()
  if (stats.value) {
    await nextTick()
    buildCharts(stats.value)
  }
})

onUnmounted(() => {
  gainsChart?.destroy()
  genderChart?.destroy()
  ageChart?.destroy()
})
</script>

<template>
  <div v-if="loading" class="flex justify-center items-center h-48 text-gray-400">
    Chargement des statistiques…
  </div>

  <div v-else-if="error" class="bg-red-500/20 border border-red-500/40 rounded-xl p-4 text-red-300">
    {{ error }}
  </div>

  <template v-else-if="stats">
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      <StatCard label="Codes joués" :value="stats.tickets.won" />
      <StatCard label="Lots récupérés en boutique" :value="stats.tickets.claimed" />
      <StatCard label="Taux de participation" :value="`${stats.tickets.participation_rate} %`" highlight />
      <StatCard label="Taux de remise" :value="`${stats.tickets.claim_rate} %`" highlight />
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 class="text-sm font-semibold text-white uppercase tracking-wide mb-4">Répartition des gains</h2>
        <div class="relative h-48"><canvas ref="gainsChartRef" /></div>
      </div>
      <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 class="text-sm font-semibold text-white uppercase tracking-wide mb-4">Gagnants par genre</h2>
        <div class="relative h-48"><canvas ref="genderChartRef" /></div>
      </div>
      <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 class="text-sm font-semibold text-white uppercase tracking-wide mb-4">Gagnants par tranche d'âge</h2>
        <div class="relative h-48"><canvas ref="ageChartRef" /></div>
      </div>
    </section>
  </template>
</template>