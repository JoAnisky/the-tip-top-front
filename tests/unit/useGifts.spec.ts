import { describe, it, expect } from 'vitest'
import {useGifts} from "../../app/composables/useGifts";

describe('useGifts', () => {
    it('retourne les 5 lots', () => {
        const { gifts } = useGifts()
        expect(gifts).toHaveLength(5)
    })

    it('trouve un lot par son id', () => {
        const { getGiftById } = useGifts()
        const gift = getGiftById(1)
        expect(gift?.name).toBe('Infuseur à thé')
    })

    it('retourne undefined pour un id inexistant', () => {
        const { getGiftById } = useGifts()
        expect(getGiftById(6)).toBeUndefined()
    })
})