export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const cookies = parseCookies(event)

    const accessToken = cookies.access_token

    if (!accessToken) {
        throw createError({
            statusCode: 401,
            message: 'Non authentifié'
        })
    }

    const body = await readBody(event)

    try {
        // @ts-ignore — bug Nitro TS2321 excessive stack depth sur $fetch externe
        return await $fetch(`${config.apiBaseUrl}/api/user/me`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: body
        })
    } catch (error: any) {
        console.error('Erreur API user/me PATCH:', error)

        throw createError({
            statusCode: error.response?.status || 500,
            message: error.response?._data?.message || 'Erreur lors de la mise à jour du profil'
        })
    }
})