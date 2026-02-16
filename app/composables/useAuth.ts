export const useAuth = () => {
    const userRef = useState<any>('auth_user', () => null)
    const loggedInRef = useState<boolean>('auth_logged_in', () => false)
    const loadingRef = useState<boolean>('auth_loading', () => false)
    // Charge la session depuis le serveur
    const fetchUser = async () => {
        loadingRef.value = true
        try {
            const response = await $fetch('/api/auth/me')

            userRef.value = response
            loggedInRef.value = true

            return response
        } catch (error) {
            console.error('fetchUser: erreur:', error)
            loggedInRef.value = false
            userRef.value = null
            return null
        } finally {
            loadingRef.value = false
        }
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
            await fetchUser()
        } catch (error) {
            console.error('Erreur refresh:', error)
            await logout()
            throw error
        }
    }

    return {
        user: userRef,
        loggedIn: readonly(loggedInRef),
        loading: readonly(loadingRef),
        fetchUser,
        logout,
        refresh
    }
}