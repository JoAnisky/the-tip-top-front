export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const cookies = parseCookies(event)
    const accessToken = cookies.access_token
    const id = getRouterParam(event, 'id')

    try {
        return await $fetch(`${config.apiBaseUrl}/api/user/${id}/codes`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
    } catch (error: any) {
        setResponseStatus(event, error.response?.status ?? 500)
        return []
    }
})