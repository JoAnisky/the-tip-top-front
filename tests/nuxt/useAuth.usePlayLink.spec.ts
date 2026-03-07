import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuth } from "~/composables/useAuth";
import { usePlayLink } from "~/composables/usePlayLink";

const fetchMock  = vi.fn()
vi.stubGlobal('$fetch', fetchMock)

describe('useAuth + usePlayLink interaction', () => {

    beforeEach(() => {
        fetchMock.mockReset()
        const { reset } = useAuth()
        reset()
    })

    it('playLink vaut "/login" quand non connecté', () => {
        const { playLink } = usePlayLink()
        expect(playLink.value).toBe('/login')
    })

    it('playLink vaut "/profile" après un fetchUser réussi', async () => {
        fetchMock.mockResolvedValueOnce({ id: '1', email: 'test@example.com' })

        const { fetchUser } = useAuth()
        const { playLink } = usePlayLink()

        await fetchUser()

        expect(playLink.value).toBe('/profile')
    })
})