export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const cookies = parseCookies(event)
    const accessToken = cookies.access_token
    const query = getQuery(event)

    const search = (query.search as string)?.trim()
    if (!search || search.length < 2) return []

    try {
        return await $fetch(`${config.apiBaseUrl}/api/user/customers`, {
            query: { search },
            headers: { Authorization: `Bearer ${accessToken}` }
        })
    } catch (error: any) {
        setResponseStatus(event, error.response?.status ?? 500)
        return []
    }
})