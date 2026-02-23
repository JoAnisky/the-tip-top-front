export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const cookies = parseCookies(event)
    const accessToken = cookies.access_token
    const body = await readBody(event)

    if (!body?.code) {
        setResponseStatus(event, 400)
        return { success: false, message: 'Code manquant' }
    }

    try {
        return await $fetch(`${config.apiBaseUrl}/api/codes/claim`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/ld+json',
                'Content-Type': 'application/ld+json',
            },
            body: JSON.stringify({ code: body.code }),
        })
    } catch (error: any) {
        const status = error.response?.status ?? 500
        setResponseStatus(event, status)
        return { success: false, message: error.data?.detail ?? 'Erreur lors du claim' }
    }
})