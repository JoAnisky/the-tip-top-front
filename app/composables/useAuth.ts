const loggedInRef = ref(false)
const userRef = ref<any>(null)
const loadingRef = ref(false)

export const useAuth = () => {
    // Charge la session depuis le serveur
    const fetchSession = async () => {
        // Si déjà loggé, on ne refait pas l'appel API (gain de perf)
        if (loggedInRef.value) return { loggedIn: true, user: userRef.value }

        loadingRef.value = true
        try {
            const data = await $fetch('/api/auth/session', {
                credentials: 'include'
            })

            loggedInRef.value = data.loggedIn
            userRef.value = data.user

            return data
        } catch (error) {
            console.error('fetchSession: erreur:', error)
            loggedInRef.value = false
            userRef.value = null
            return { loggedIn: false, user: null }
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
            await fetchSession()
        } catch (error) {
            console.error('Erreur refresh:', error)
            await logout()
            throw error
        }
    }

    return {
        user: readonly(userRef),
        loggedIn: readonly(loggedInRef),
        loading: readonly(loadingRef),
        fetchSession,
        logout,
        refresh
    }
}