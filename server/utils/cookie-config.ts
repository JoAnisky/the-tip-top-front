export const getCookieConfig = () => {
    const config = useRuntimeConfig()

    // Détermine le domaine en fonction de l'environnement
    const isDev = process.env.NODE_ENV === 'development'

    // En dev : .dev.local, en prod : extrait du NUXT_PUBLIC_SITE_URL
    let domain = '.dev.local'

    if (!isDev && config.public.siteUrl) {
        try {
            const url = new URL(config.public.siteUrl)
            // Extrait le domaine principal (ex: the-tip-top.fr depuis www.the-tip-top.fr)
            const parts = url.hostname.split('.')
            if (parts.length >= 2) {
                domain = '.' + parts.slice(-2).join('.')  // .the-tip-top.fr
            }
        } catch (error) {
            console.error('Erreur parsing NUXT_PUBLIC_SITE_URL:', error)
        }
    }

    return {
        domain,
        secure: !isDev,  // true en prod
        sameSite: 'lax' as const,
        path: '/'
    }
}

export const AUTH_COOKIE_NAMES = {
    USER: 'auth_user',
    TOKEN: 'auth_token'
} as const

export const COOKIE_MAX_AGE = {
    USER: 60 * 60 * 24 * 30,  // 30 jours
    TOKEN: 60 * 15             // 15 minutes
} as const