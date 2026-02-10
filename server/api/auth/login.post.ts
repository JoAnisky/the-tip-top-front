export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const body = await readBody(event)
    const cookieConfig = getCookieConfig()

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

        const data = await response.json()

        // Stocke l'utilisateur
        setCookie(event, AUTH_COOKIE_NAMES.USER, JSON.stringify(data.user), {
            ...cookieConfig,
            httpOnly: false,  // Le client doit pouvoir lire
            maxAge: COOKIE_MAX_AGE.USER
        })

        // Stocke le token
        setCookie(event, AUTH_COOKIE_NAMES.TOKEN, data.accessToken, {
            ...cookieConfig,
            httpOnly: false,
            maxAge: COOKIE_MAX_AGE.TOKEN
        })

        return {
            success: true,
            user: data.user,
            accessToken: data.accessToken
        }
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 401,
            message: error.message || 'Identifiants incorrects'
        })
    }
})