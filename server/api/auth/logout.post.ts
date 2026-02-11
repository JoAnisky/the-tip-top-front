export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    try {
        const response = await fetch(`${config.apiBaseUrl}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Cookie: getHeader(event, 'cookie') || ''
            }
        })

        if (!response.ok) {
            throw createError({
                statusCode: response.status,
                message: 'Erreur lors de la déconnexion'
            })
        }

        // Récupère les cookies de suppression de Symfony
        const setCookieHeaders = extractSetCookieHeaders(response)

        if (setCookieHeaders.length > 0) {
            setCookieHeaders.forEach(cookie => {
                console.log('  Cookie:', cookie)
                appendResponseHeader(event, 'set-cookie', cookie)
            })
        } else {
            console.warn('Aucun cookie Set-Cookie reçu de Symfony')
        }

    } catch (error) {
        console.error('Erreur logout Symfony:', error)
    }

    return { success: true }
})