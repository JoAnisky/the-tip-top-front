import { describe, it, expect } from 'vitest'
import { useFormErrorAnnouncer } from "../../app/composables/useFormErrorAnnouncer";

describe('useFormErrorAnnouncer', () => {
    it('initialise errorAnnoucer à null', () => {
        const { errorAnnouncer } = useFormErrorAnnouncer()
        expect(errorAnnouncer.value).toBeNull()
    })
})