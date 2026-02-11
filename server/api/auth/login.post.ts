export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const body = await readBody(event)

    try {
        const response = await fetch(`${config.apiBaseUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                email: body.email,
                password: body.password
            })
        })

        if (!response.ok) {
            throw createError({
                statusCode: response.status,
                message: 'Identifiants incorrects'
            })
        }

        // Transfert TOUS les cookies HTTP-only de Symfony au client
        const setCookieHeaders = response.headers.getSetCookie?.() || []

        if (setCookieHeaders.length === 0) {
            const cookieHeader = response.headers.get('set-cookie')
            if (cookieHeader) {
                // Peut être une seule string ou plusieurs séparées
                setCookieHeaders.push(...cookieHeader.split(',').map(c => c.trim()))
            }
        }

        // Transfère chaque cookie au client
        if (setCookieHeaders.length > 0) {
            setCookieHeaders.forEach(cookie => {
                event.node.res.appendHeader('set-cookie', cookie)
            })
        }

        return { success: true }
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 401,
            message: error.message || 'Identifiants incorrects'
        })
    }
})