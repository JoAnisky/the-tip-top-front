import { ref, onMounted, onUnmounted } from 'vue';

/**
 * Marque la section ou la page active avec IntersectionObserver
 */
export const useActiveSection = () => {
    const activeHash = ref('')
    let observer: IntersectionObserver | null = null

    const handleScroll = () => {
        if (window.scrollY < 100) {
            activeHash.value = '' // Reset le hash pour allumer "Accueil"
        }
    }

    const initObserver = () => {
        const observerOptions: IntersectionObserverInit = {
            rootMargin: '-20% 0px -40% 0px',
            threshold: 0
        }

        observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const id = '#' + entry.target.id
                if (entry.isIntersecting) {
                    activeHash.value = id
                } else if (activeHash.value === id) {
                    activeHash.value = ''
                }
            })
        }, observerOptions)

        // On observe toutes les sections qui possèdent un ID
        document.querySelectorAll('section[id]').forEach((section) => {
            observer?.observe(section)
        })
    }

    onMounted(() => {
        setTimeout(() => {
            initObserver()
            // On écoute le scroll pour le haut de page
            window.addEventListener('scroll', handleScroll)

            if (window.location.hash) {
                activeHash.value = window.location.hash
            }
        }, 200)
    })

    onUnmounted(() => {
        observer?.disconnect()
        window.removeEventListener('scroll', handleScroll)
    })

    return activeHash;
}