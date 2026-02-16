export default defineEventHandler(async (event) => {

    const config = useRuntimeConfig()
    const cookies = parseCookies(event)
    const accessToken = cookies.access_token

    if (!accessToken) {
        console.error('❌ Pas de access_token')
        throw createError({
            statusCode: 401,
            message: 'Non authentifié'
        })
    }

    try {
        const url = `${config.apiBaseUrl}/api/user/me`

        return await $fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

    } catch (error: any) {
        console.error('❌ Erreur complète:', {
            status: error.response?.status,
            data: error.response?._data,
            message: error.message
        })

        throw createError({
            statusCode: error.response?.status || 500,
            message: error.response?._data?.message || 'Erreur lors de la récupération du profil'
        })
    }
})