export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const cookies = parseCookies(event)
    const accessToken = cookies.access_token

    if (!accessToken) {
        setResponseStatus(event, 401)
        return null
    }

    const body = await readBody(event)

    try {
        const response = await $fetch(`${config.apiBaseUrl}/api/codes/validate`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/ld+json',
                'Accept': 'application/ld+json'
            },
            body: { code: body.code }
        })
        return response
    } catch (error: any) {
        const status = error.response?.status ?? 500
        const message = error.data?.detail
            ?? error.data?.message
            ?? 'Erreur serveur'

        throw createError({ statusCode: status, message })
    }
})