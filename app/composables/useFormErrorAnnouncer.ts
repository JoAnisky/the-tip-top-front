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