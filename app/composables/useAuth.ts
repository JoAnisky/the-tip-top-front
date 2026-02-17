export const useAuth = () => {
    const userRef = useState<any>('auth_user', () => null)
    const loggedInRef = useState<boolean>('auth_logged_in', () => false)
    const loadingRef = useState<boolean>('auth_loading', () => false)

    // Sert à savoir si on a déjà tenté de charger pour éviter deux fetch des middlewares (guest et auth)
    const initializedRef = useState<boolean>('auth_initialized', () => false)

    // Charge la session depuis le serveur
    const fetchUser = async () => {
        if (initializedRef.value) {
            return userRef.value
        }
        loadingRef.value = true
        try {
            const response = await $fetch('/api/auth/me')

            userRef.value = response
            loggedInRef.value = true

            return response
        } catch (error) {
            // console.error('fetchUser: erreur:', error)
            loggedInRef.value = false
            userRef.value = null
            return null
        } finally {
            loadingRef.value = false
            initializedRef.value = true
        }
    }

    const login = async (email: string, password: string) => {
        await $fetch('/api/auth/login', {
            method: 'POST',
            body: { email, password }
        })

        // Reset pour forcer le rechargement des données
        initializedRef.value = false
        userRef.value = null
        loggedInRef.value = false

        // Charger les nouvelles données
        await fetchUser()
    }

    const logout = async () => {
        try {
            await $fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            })
        } catch (error) {
            console.error('Erreur logout:', error)
        } finally {
            // vide l'état local quoi qu'il arrive
            loggedInRef.value = false
            userRef.value = null
            initializedRef.value = false
            // On redirige vers l'accueil ou le login après déconnexion
            await navigateTo('/login')
        }
    }

    const refresh = async () => {
        try {
            await $fetch('/api/auth/refresh', {
                method: 'POST',
                credentials: 'include'
            })
            initializedRef.value = false
            await fetchUser()
        } catch (error) {
            console.error('Erreur refresh:', error)
            await logout()
            throw error
        }
    }

    const invalidate = () => {
        initializedRef.value = false
    }

    return {
        user: userRef,
        loggedIn: readonly(loggedInRef),
        loading: readonly(loadingRef),
        initialized: readonly(initializedRef),
        fetchUser,
        login,
        logout,
        refresh,
        invalidate,
    }
}