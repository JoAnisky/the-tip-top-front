export default defineNuxtRouteMiddleware(async (to, from) => {
    const { loggedIn, fetch } = useUserSession()

    // en cas de doute, on force un rafraîchissement côté serveur/client
    if (!loggedIn.value) {
        await fetch()
    }

    if (!loggedIn.value) {
        return navigateTo('/login')
    }
})