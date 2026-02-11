export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.server) return

    const { loggedIn, fetchSession, loadingRef } = useAuth()

    // Si on n'est pas log, on tente une dernière fois de récupérer la session
    // if (!loggedIn.value && !loadingRef.value) {
    //     await fetchSession()
    // }

    // Redirection si toujours pas loggé
    if (!loggedIn.value && to.path !== '/login') {
        return window.location.href = '/login'
    }
})