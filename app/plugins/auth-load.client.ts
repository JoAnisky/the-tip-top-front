export default defineNuxtPlugin({
    name: 'auth-load',
    parallel: false,
    async setup() {

        const { fetchSession, loggedIn } = useAuth()

        if (!loggedIn.value) {
            try {
                await fetchSession()
            } catch (error) {
                console.error('  - Erreur fetchSession:', error)
            }
        }
    }
})