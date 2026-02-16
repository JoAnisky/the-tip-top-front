export default defineNuxtPlugin({
    name: 'auth-load',
    parallel: false,
    async setup() {

        const { fetchUser, loggedIn } = useAuth()

        if (!loggedIn.value) {
            try {
                await fetchUser()
            } catch (error) {
                console.error('  - Erreur fetchUser:', error)
            }
        }
    }
})