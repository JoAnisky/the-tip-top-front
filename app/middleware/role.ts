export default defineNuxtRouteMiddleware(async (to) => {
    if (process.server) return

    const { user, loggedIn } = useAuth()

    const requiredRole = to.meta.role as string | undefined
    if (!requiredRole) return

    // auth.ts a déjà fetchUser, si loggedIn est false ici c'est qu'on n'est pas connecté
    if (!loggedIn.value || !user.value?.roles?.includes(requiredRole)) {
        return navigateTo('/')
    }
})