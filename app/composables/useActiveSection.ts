import { ref, onMounted, onUnmounted } from 'vue';

/**
 * Marque la section ou la page active avec IntersectionObserver
 */
export const useActiveSection = () => {
    const activeHash = ref('')

    let observer: IntersectionObserver | null = null

    const initObserver = () => {
        const observerOptions: IntersectionObserverInit = {
            rootMargin: '-10% 0px -80% 0px',
            threshold: 0
        }

        observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    activeHash.value = '#' + entry.target.id
                }
            })
        }, observerOptions)

        // On observe toutes les sections qui possèdent un ID
        document.querySelectorAll('section[id]').forEach((section) => {
            observer?.observe(section)
        })
    }

    onMounted(() => {
        initObserver()
        if (window.location.hash) {
            activeHash.value = window.location.hash
        }
    })

    onUnmounted(() => {
        observer?.disconnect()
    })
    console.log("active hash:", activeHash.value)
    return activeHash;
}