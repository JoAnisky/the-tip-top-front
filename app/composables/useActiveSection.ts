import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
/**
 * Marque la section ou la page active avec IntersectionObserver
 */
export const useActiveSection = () => {
    const activeHash = ref('')
    const route = useRoute()
    let observer: IntersectionObserver | null = null

    const handleScroll = () => {
        // uniquement sur la page d'accueil
        if (route.path === '/' && window.scrollY < 100) {
            activeHash.value = ''
        }
    }

    const initObserver = () => {

        // on déconnecte l'ancien observer s'il existe
        if (observer) observer.disconnect()

        const observerOptions: IntersectionObserverInit = {
            rootMargin: '-20% 0px -40% 0px',
            threshold: 0
        }

        observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const id = '#' + entry.target.id
                if (entry.isIntersecting) {
                    activeHash.value = id
                }
            })
        }, observerOptions)

        const sections = document.querySelectorAll('section[id]')
        sections.forEach((section) => observer?.observe(section))
    }

    // Fonction de nettoyage et relance
    const refresh = () => {
        if (route.path === '/') {
            setTimeout(() => {
                initObserver()
                if (window.location.hash) {
                    activeHash.value = window.location.hash
                }
            }, 300) // Petit délai pour laisser le DOM se stabiliser
        } else {
            activeHash.value = '' // On vide sur les autres pages
        }
    }

    onMounted(() => {
        refresh()
        window.addEventListener('scroll', handleScroll, { passive: true })
    })

    // on surveille le changement de route pour relancer l'observer
    watch(() => route.fullPath, () => {
        refresh()
    })

    onUnmounted(() => {
        observer?.disconnect()
        window.removeEventListener('scroll', handleScroll)
    })

    return activeHash;
}