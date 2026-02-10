// app/middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
    const { loggedIn } = useAuth()  // ⚠️ useAuth au lieu de useUserSession

    console.log('🔒 Middleware auth:', to.path, 'loggedIn:', loggedIn.value)

    if (!loggedIn.value && to.path !== '/login') {
        console.log('❌ Redirection vers /login')
        return navigateTo('/login')
    }

    console.log('✅ Accès autorisé')
})