import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useSpinWheel } from '~/composables/useSpinWheel'

// Spinner instantané — remplace les 4 secondes de spinToRandom
const instantSpinner = vi.fn().mockResolvedValue(undefined)

// Mock $fetch global
const fetchMock = vi.fn()
vi.stubGlobal('$fetch', fetchMock)

// Mock useToast pour éviter l'erreur "not in Nuxt context"
vi.stubGlobal('useToast', () => ({ add: vi.fn() }))

describe('useSpinWheel', () => {
    beforeEach(() => {
        fetchMock.mockReset()
        instantSpinner.mockClear()
    })

    it('remplit winResult et ouvre la modale après une soumission réussie', async () => {
        fetchMock.mockResolvedValueOnce({
            id: 42,
            gain: { id: 2, name: 'Boîte de 100g de thé détox' }
        })

        const { onSubmit, winResult, isModalOpen } = useSpinWheel(instantSpinner)

        await onSubmit('DFGT67YH78')

        expect(winResult.value).toEqual({
            gainLabel: 'Boîte de 100g de thé détox',
            gainId: 2,
            codeId: 42
        })
        expect(isModalOpen.value).toBe(true)
    })

    it('remplit hasError et errorMessage si l\'API retourne une erreur', async () => {
        fetchMock.mockRejectedValueOnce({
            data: { message: 'Code déjà utilisé' }
        })

        const { onSubmit, hasError, errorMessage } = useSpinWheel(instantSpinner)

        await onSubmit('DFGT67YH78')

        expect(hasError.value).toBe(true)
        expect(errorMessage.value).toBe('Code déjà utilisé')
    })
})