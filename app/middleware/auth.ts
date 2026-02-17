export default defineNuxtRouteMiddleware(async (to) => {
    if (process.server) return

    const { loggedIn, fetchUser } = useAuth()

    // fetchUser ne s'exécute qu'une seule fois grâce à initialized
    await fetchUser()

    if (!loggedIn.value) {
        return navigateTo('/login')
    }
})