export const useAuth = () => {
    const config = useRuntimeConfig()

    // Détermine le domaine dynamiquement
    const isDev = process.dev
    let domain = '.dev.local'

    if (!isDev && config.public.siteUrl) {
        try {
            const url = new URL(config.public.siteUrl)
            const parts = url.hostname.split('.')
            if (parts.length >= 2) {
                domain = '.' + parts.slice(-2).join('.')
            }
        } catch (error) {
            console.error('Erreur parsing domain:', error)
        }
    }

    const userCookie = useCookie('auth_user', {
        domain,
        path: '/'
    })

    const tokenCookie = useCookie('auth_token', {
        domain,
        path: '/'
    })

    const user = computed(() => {
        if (!userCookie.value) return null

        try {
            return typeof userCookie.value === 'string'
                ? JSON.parse(userCookie.value)
                : userCookie.value
        } catch {
            return null
        }
    })

    const accessToken = computed(() => tokenCookie.value)

    const loggedIn = computed(() => {
        return !!user.value && !!accessToken.value
    })

    const logout = async () => {
        try {
            await $fetch('/api/auth/logout', { method: 'POST' })
        } catch (error) {
            console.error('Erreur logout:', error)
        }

        userCookie.value = null
        tokenCookie.value = null
    }

    return {
        user: readonly(user),
        accessToken: readonly(accessToken),
        loggedIn: readonly(loggedIn),
        logout
    }
}