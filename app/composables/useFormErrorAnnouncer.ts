
import { ref, nextTick } from 'vue'
// Nuxt injecte ref au moment du build, mais le composable n'est pas autonome, il dépend de son environnement d'exécution pour fonctionner.
// En ajoutant import { ref, nextTick }, le composable est explicitement autonome
// sans cet import, les tests fonctionnels échouent car ref et nexTick sont injectés au moment du build


/**
 * Annoncer aux lecteurs NVDA que des champs de formulaire requis sont manquants
 */
export function useFormErrorAnnouncer() {
    const errorAnnouncer = ref<HTMLElement | null>(null)

    function onError(errors: any) {
        if (errorAnnouncer.value) {
            const messages = errors.errors.map((e: any) => e.message).join('. ')
            errorAnnouncer.value.textContent = ''
            nextTick(() => {
                if (errorAnnouncer.value) {
                    errorAnnouncer.value.textContent = `Erreurs dans le formulaire : ${messages}`
                }
            })
        }
    }

    return { errorAnnouncer, onError }
}