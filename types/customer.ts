export interface CustomerCode {
    id: number
    code: string
    gainName: string | null
    validatedOn: string | null
    isClaimed: boolean
    claimedOn: string | null
    expiresAt: string | null
}

export interface Customer {
    id: number
    firstName: string | null
    lastName: string | null
    email: string
    codes?: CustomerCode[]
}
