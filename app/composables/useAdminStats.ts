export const useAdminStats = () => {
    const stats = ref<AdminStats | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)
    const { apiFetch } = useApiFetch()

    const fetchStats = async () => {
        loading.value = true
        error.value = null
        try {
            stats.value = await apiFetch<AdminStats>('/api/admin/stats')
        } catch (e: any) {
            error.value = e.data?.message ?? 'Impossible de charger les statistiques'
        } finally {
            loading.value = false
        }
    }

    return { stats, loading, error, fetchStats }
}