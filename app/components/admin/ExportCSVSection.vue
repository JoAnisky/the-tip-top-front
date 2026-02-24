<script setup lang="ts">
const downloading = ref<string | null>(null)

async function downloadExport(filter: 'all' | 'newsletter' | 'unclaimed') {
  downloading.value = filter
  try {
    const blob = await $fetch<Blob>(`/api/admin/export?filter=${filter}`, {
      responseType: 'blob'  // indique à $fetch de ne pas parser la réponse
    })

    // Crée une URL temporaire pointant vers le blob en mémoire
    const url  = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href     = url
    link.download = `export-${filter}-${new Date().toISOString().split('T')[0]}.csv`
    link.click()

    // Libère la mémoire
    URL.revokeObjectURL(url)
  } catch (error: any){
    // console.error("Erreur lors de la récupération des données pour export csv : " , error)
  } finally {
    downloading.value = null
  }
}
</script>

<template>
  <section class="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
    <h2 class="text-sm font-semibold text-white uppercase tracking-wide mb-4">
      Export emailing
    </h2>
    <div class="flex flex-wrap gap-3">
      <UButton
          label="Tous les utilisateurs"
          icon="i-heroicons-arrow-down-tray"
          :loading="downloading === 'all'"
          @click="downloadExport('all')"
      />
      <UButton
          label="Abonnés newsletter"
          icon="i-heroicons-envelope"
          :loading="downloading === 'newsletter'"
          @click="downloadExport('newsletter')"
      />
      <UButton
          label="Lots non récupérés"
          icon="i-heroicons-exclamation-circle"
          :loading="downloading === 'unclaimed'"
          @click="downloadExport('unclaimed')"
      />
    </div>
  </section>
</template>