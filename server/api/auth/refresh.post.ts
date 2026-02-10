export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    try {
        // Le cookie refresh_token est automatiquement transféré
        const response = await $fetch(`${config.apiBaseUrl}/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                // Transmet les cookies du client au serveur API
                Cookie: event.node.req.headers.cookie || ''
            }
        })

        // Met à jour la session Nuxt
        const session = await getUserSession(event)
        await setUserSession(event, {
            ...session,
            user: response.user,
            accessToken: response.accessToken
        })

        return response
    } catch (error: any) {
        // Clear session si le refresh échoue
        await clearUserSession(event)

        throw createError({
            statusCode: 401,
            message: 'Session expirée'
        })
    }
})