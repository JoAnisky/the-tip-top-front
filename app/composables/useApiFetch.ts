export const useApiFetch = () => {
    const { refresh, logout } = useAuth()

    /**
     * Tente un refresh_token et rejoue la requête si l'appel API échoue (évite erreurs si page pas rechargée)
     * Si ça échoue : on logout
     * @param url
     * @param options
     */
    const apiFetch = async <T>(url: string, options?: any): Promise<T> => {
        try {
            return await $fetch<T>(url, options)
        } catch (error: any) {
            if (error?.response?.status === 401) {
                try {
                    await refresh()
                    return await $fetch<T>(url, options)
                } catch {
                    await logout()
                    throw error
                }
            }
            throw error
        }
    }

    return { apiFetch }
}