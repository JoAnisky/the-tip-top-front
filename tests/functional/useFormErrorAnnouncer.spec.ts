import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import { useFormErrorAnnouncer } from "../../app/composables/useFormErrorAnnouncer";

describe('useFormErrorAnnouncer', () => {
    it('initialise errorAnnoucer à null', () => {
        const { errorAnnouncer } = useFormErrorAnnouncer()
        expect(errorAnnouncer.value).toBeNull()
    })

    it('injecte le message d\'erreur dans le DOM après next!tick', async() => {
        const { errorAnnouncer, onError } = useFormErrorAnnouncer()

        // On créé un vrai élément DOM et on le branche manuellement
        const div = document.createElement('div')
        errorAnnouncer.value = div

        onError({ errors: [{ message: 'Champ requis' }] })

        expect(div.textContent).toBe('')

        await nextTick()

        // Après nextTick : le message est là
        expect(div.textContent).toBe('Erreurs dans le formulaire : Champ requis')
    })
})