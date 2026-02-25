/**
 * useCookieConsent
 * Gère la lecture et l'écriture des préférences de cookies via useCookie() (SSR-compatible).
 *
 * Structure du cookie stocké (JSON) :
 * {
 *   decided: boolean,       // l'utilisateur a fait un choix
 *   preferences: boolean,   // cookies de préférences
 *   analytics: boolean,     // cookies de mesure d'audience
 *   social: boolean,        // cookies de connexion sociale
 * }
 */

export type CookieConsent = {
    decided: boolean,
    preferences: boolean,
    analytics: boolean,
    social: boolean,
}


const COOKIE_NAME = 'cookie_consent'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 12 mois de validité (en secondes)

export const useCookieConsent = () => {
    const consentCookie = useCookie<CookieConsent | null>(COOKIE_NAME, {
        maxAge: COOKIE_MAX_AGE,
        path: '/',
        sameSite: 'lax'
    })
    // On ne le passe pas ce cookie en httpOnly pour qu'il soit lisible côté JS pour l'UI

    const consent = computed<CookieConsent>(() => consentCookie.value ?? {
        decided: false,
        preferences: false,
        analytics: false,
        social: false,
    })

    const hasDecided = computed(() => consent.value.decided)

    const allowsPreferences = computed(() => consent.value.preferences)
    const allowsAnalytics = computed(() => consent.value.analytics)
    const allowsSocial = computed(() => consent.value.social)

    /**
     * Enregistre les préférences choisies par l'utilisateur.
     */
    function saveConsent(choices: Omit<CookieConsent, 'decided'>) {
        consentCookie.value = {
            decided: true,
            ...choices,
        }
    }

    /**
     * Accepte tous les cookies optionnels.
     */
    function acceptAll(){
        saveConsent({ preferences: true, analytics: true, social: true })
    }

    /**
     * Refuse tous les cookies optionnels.
     */
    function rejectAll(){
        saveConsent({ preferences: false, analytics: false, social: false })
    }

    /**
     * Réinitialise le consentement (l'utilisateur verra de nouveau le bandeau).
     */
    function resetConsent() {
        consentCookie.value = null
    }

    return {
        consent,
        hasDecided,
        allowsPreferences,
        allowsAnalytics,
        allowsSocial,
        saveConsent,
        acceptAll,
        rejectAll,
        resetConsent,
    }
}