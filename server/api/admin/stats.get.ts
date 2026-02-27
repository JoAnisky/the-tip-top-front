export default defineEventHandler(async (event): Promise<StatsResponse> => {
    const config = useRuntimeConfig()
    const cookies = parseCookies(event)
    const accessToken = cookies.access_token

    try {
        return await $fetch<StatsResponse>(
            `${config.apiBaseUrl}/api/admin/stats` as string,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        ) as StatsResponse
    } catch (error: any) {
        const status = error.response?.status ?? 500
        const message = error.data?.detail ?? error.data?.message ?? 'Erreur serveur'
        throw createError({ statusCode: status, message })
    }
})