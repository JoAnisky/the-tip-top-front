export interface UserGain {
    id: number
    code: string
    gainName: string
    gainId: number
    validatedOn: string // format ISO date
    isClaimed: boolean
    claimedOn: string | null
}

export interface ApiCodeResponse {
    id: number
    gain: {
        id: number
        name: string
    }
}

export interface WinResult {
    gainLabel: string
    gainId: number
    codeId: number
}