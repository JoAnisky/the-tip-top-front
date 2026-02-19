export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const cookies = parseCookies(event)
    const accessToken = cookies.access_token

    if (!accessToken) {
        return await tryRefreshAndRetry(event, config)
    }

    const userData = await callSymfony(event, config, accessToken)
    if (userData != null) {
        return userData
    }

    // 401 reçu → tentative de refresh
    return await tryRefreshAndRetry(event, config)
})

async function callSymfony(event: any, config: any, accessToken: string) {
    try {
        return await $fetch(`${config.apiBaseUrl}/api/user/me`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        })
    } catch (error: any) {
        if (error.response?.status === 401) return null
        throw createError({ statusCode: 500, message: 'Erreur serveur' })
    }
}

async function tryRefreshAndRetry(event: any, config: any) {
    const cookies = parseCookies(event)
    const refreshToken = cookies.refresh_token
    if (!refreshToken) {
        setResponseStatus(event, 401)
        return null
    }

    try {
        // Appel refresh vers Symfony
        const refreshResponse = await fetch(`${config.apiBaseUrl}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Cookie': `refresh_token=${refreshToken}`
            }
        })

        if (!refreshResponse.ok) {
            setResponseStatus(event, 401)
            return null
        }

        // Transférer les nouveaux cookies au client
        const setCookieHeaders = refreshResponse.headers.getSetCookie?.() ?? []

        let newAccessToken: string | null = null

        setCookieHeaders.forEach((cookie: string) => {
            event.node.res.appendHeader('set-cookie', cookie)
            // Extraire le nouveau access_token pour rejouer la requête
            if (cookie.startsWith('access_token=')) {
                newAccessToken = cookie.split(';')[0].split('=')[1]
            }
        })

        if (!newAccessToken) {
            setResponseStatus(event, 401)
            return null
        }

        // Après le refresh réussi, avant de rejouer /api/user/me
        setResponseStatus(event, 200)
        event.node.res.setHeader('x-token-refreshed', '1')

        // Rejouer /api/user/me avec le nouveau token
        return await $fetch(`${config.apiBaseUrl}/api/user/me`, {
            headers: { 'Authorization': `Bearer ${newAccessToken}` }
        })

    } catch {
        setResponseStatus(event, 401)
        return null
    }
}