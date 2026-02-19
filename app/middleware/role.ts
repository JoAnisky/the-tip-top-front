export default defineNuxtRouteMiddleware(async (to) => {
    const { user, fetchUser } = await fetchUser()

    if(!user.value){
        await fetchUser()
    }

    const requiredRole = to.meta.role as string | undefined
    if(!requiredRole) return

    if (!user.value?.roles?.includes(requiredRole)) {
        return navigateTo('/')
    }
})