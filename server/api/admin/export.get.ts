export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const query = getQuery(event)
    const filter = (query.filter as string) ?? 'all'
    const cookies = parseCookies(event)
    const accessToken = cookies.access_token

    const response = await $fetch.raw(
        `${config.apiBaseUrl}/api/user/export?filter=${filter}`,
        {
            headers: { Authorization: `Bearer ${accessToken}` }
        }
    )

    // On recopie les headers Symfony vers le client
    setHeader(event, 'Content-Type', 'text/csv; charset=UTF-8')
    setHeader(event, 'Content-Disposition', response.headers.get('Content-Disposition') ?? '')

    return response._data
})