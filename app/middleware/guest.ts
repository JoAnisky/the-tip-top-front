export default defineNuxtRouteMiddleware(async (to, from) => {
    // Skip côté serveur
    if (process.server) return

    const { loggedIn, fetchUser } = useAuth()

    await fetchUser()

    // Si connecté, redirige vers la page précédente ou /profile
    if (loggedIn.value) {
        // évite la boucle infinie si la page précédente est aussi login/register
        const redirectTo = from.path &&
        from.path !== '/login' &&
        from.path !== '/register'
            ? from.path
            : '/profile'

        if (process.client) {
            await nextTick()
        }
        return navigateTo(redirectTo, {
            replace: true,
        })
    }
})