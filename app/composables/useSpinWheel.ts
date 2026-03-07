import { ref } from 'vue'

const SPIN_DURATION_MS = 4000 // durée de rotation de la roue
const MIN_TURNS = 5
const MAX_TURNS = 8
const COOLDOWN_MS = 3000 // au bout de combien de temps on peut relancer (qu'il y ait une erreur dans le code ou non)

function spinToRandom(currentRotation: { value: number }): Promise<void> {
    return new Promise((resolve) => {
        const extraTurns = MIN_TURNS + Math.floor(Math.random() * (MAX_TURNS - MIN_TURNS))
        const randomAngle = Math.floor(Math.random() * 360)
        currentRotation.value += extraTurns * 360 + randomAngle
        setTimeout(resolve, SPIN_DURATION_MS)
    })
}

export const useSpinWheel = (spinner = spinToRandom) => {

    const loading = ref(false)
    const isSpinning = ref(false)
    const hasError = ref(false)
    const errorMessage = ref('')
    const isModalOpen = ref(false)
    const currentRotation = ref(0)
    const winResult = ref<WinResult | null>(null)
    const cooldownActive = ref(false)

    const { invalidate, fetchUser } = useAuth()
    const toast = useToast()

    async function onSubmit(code: string) {
        if (isSpinning.value || loading.value || cooldownActive.value) return

        loading.value = true
        hasError.value = false
        errorMessage.value = ''

        try {
            const response = await $fetch<ApiCodeResponse>('/api/auth/code', {
                method: 'POST',
                body: { code }
            })

            winResult.value = {
                gainLabel: response.gain.name,
                gainId: response.gain.id,
                codeId: response.id
            }

            isSpinning.value = true
            await spinner(currentRotation)
            invalidate()
            await fetchUser()
            isModalOpen.value = true

        } catch (err: any) {
            hasError.value = true
            errorMessage.value = err.data?.message || 'Ce code est invalide ou déjà utilisé.'

            cooldownActive.value = true
            setTimeout(() => { cooldownActive.value = false }, COOLDOWN_MS)

            toast.add({
                title: 'Code invalide',
                description: errorMessage.value,
                color: 'red',
                timeout: 5000
            })
        } finally {
            loading.value = false
            isSpinning.value = false
        }
    }

    return {
        loading,
        isSpinning,
        hasError,
        errorMessage,
        isModalOpen,
        currentRotation,
        winResult,
        cooldownActive,
        onSubmit,
    }
}