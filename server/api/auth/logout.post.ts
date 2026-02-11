export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    try {
        // appel Symfony pour révoquer le refresh_token
        const response = await fetch(`${config.apiBaseUrl}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Cookie: event.node.req.headers.cookie || ''
            }
        })

        // Transfert les cookies de suppression de Symfony
        const setCookieHeaders = extractSetCookieHeaders(response)

        if (setCookieHeaders.length > 0) {
            setCookieHeaders.forEach(cookie => {
                event.node.res.appendHeader('set-cookie', cookie)
            })
        }
    } catch (error) {
        console.error('Erreur logout Symfony:', error)
    }

    return { success: true }
})