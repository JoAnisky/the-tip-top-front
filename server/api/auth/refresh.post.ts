export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    try {
        // Appel Symfony avec les cookies (refresh_token)
        const response = await fetch(`${config.apiBaseUrl}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Transmet TOUS les cookies du client (dont refresh_token de Symfony)
                Cookie: event.node.req.headers.cookie || ''
            }
        })

        if (!response.ok) {
            console.error('Refresh échoué')
            throw createError({
                statusCode: response.status,
                message: 'Session expirée'
            })
        }

        const data = await response.json()

        // transfert les nouveaux cookies HTTP-only de Symfony au client
        const setCookieHeaders = extractSetCookieHeaders(response)

        if (setCookieHeaders.length > 0) {
            setCookieHeaders.forEach(cookie => {
                event.node.res.appendHeader('set-cookie', cookie)
            })
        } else {
            console.warn('Aucun nouveau cookie reçu de Symfony')
        }

        return {
            success: true
        }
    } catch (error: any) {
        console.error('Erreur refresh:', error)

        throw createError({
            statusCode: 401,
            message: 'Session expirée'
        })
    }
})