export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    try {
        // Appel API pour révoquer le refresh token
        await $fetch(`${config.apiBaseUrl}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                Cookie: event.node.req.headers.cookie || ''
            }
        })
    } catch (error) {
        // Continue même si l'appel API échoue
        console.error('Erreur logout Symfony:', error)
    }

    // Supprime la session Nuxt
    await clearUserSession(event)

    return { success: true }
})