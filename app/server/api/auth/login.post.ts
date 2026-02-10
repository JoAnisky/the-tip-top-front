export const defineEventHandler = (async (event) => {
    const config = useRuntimeConfig()
    const body = await readBody(event)

    try {
        const response = await $fetch(`${config.apiBaseUrl}/auth/login`, {
            method: 'POST',
            body: {
                email: body.email,
                password: body.password
            },
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        await setUserSession(event, {
            user: response.user,
            accessToken: response.accessToken,
            loggedInAt: new Date()
        })

        return response
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 401,
            message: error.data?.message || 'Erreur d\'authentification'
        })
    }

})