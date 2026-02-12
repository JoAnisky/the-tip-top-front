export default defineNuxtRouteMiddleware(async (to, from) => {
    // ignorer le côté serveur pour les cookies HttpOnly
    if (process.server) return

    const { loggedIn, fetchSession } = useAuth()

    // Sécu : Si l'état dit "pas connecté", on vérifie une
    // dernière fois auprès de l'API avant de rejeter l'utilisateur.
    // gère le cas du rafraîchissement de page (F5).
    if (!loggedIn.value) {
        await fetchSession()
    }

    // Une fois le fetch terminé, si on n'est toujours pas loggé
    if (!loggedIn.value && to.path !== '/login') {
        return navigateTo('/login', {
            replace: true,
        })
    }
})