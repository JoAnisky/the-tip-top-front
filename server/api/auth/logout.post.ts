export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const cookieConfig = getCookieConfig()

    try {
        // Appel Symfony
        await fetch(`${config.apiBaseUrl}/auth/logout`, {
            method: 'POST',
            headers: {
                Cookie: event.node.req.headers.cookie || ''
            }
        })
    } catch (error) {
        console.error('Erreur logout Symfony:', error)
    }

    // Supprime les cookies avec la bonne config
    deleteCookie(event, AUTH_COOKIE_NAMES.USER, cookieConfig)
    deleteCookie(event, AUTH_COOKIE_NAMES.TOKEN, cookieConfig)

    return { success: true }
})