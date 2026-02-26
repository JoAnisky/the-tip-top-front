export interface TicketStats {
    total: number
    used: number
    won: number
    claimed: number
    participation_rate: number
    claim_rate: number
}

export interface GainStat {
    gain_name: string
    total: number
}

export interface GenderStat {
    gender: string
    total: number
}

export interface AgeGroupStat {
    label: '<18' | '18-24' | '25-34' | '35-49' | '50+'
    total: number
}

export interface WinnersStats {
    gender: GenderStat[]
    age_groups: AgeGroupStat[]
}

export interface StatsResponse {
    tickets: TicketStats
    gains: GainStat[]
    winners: WinnersStats
}