export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const cookies = parseCookies(event)
    const accessToken = cookies.access_token

    try {
        return await $fetch(`${config.apiBaseUrl}/api/admin/stats`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
    } catch (error: any) {
        const status = error.response?.status ?? 500
        const message = error.data?.detail ?? error.data?.message ?? 'Erreur serveur'
        throw createError({ statusCode: status, message })
    }
})