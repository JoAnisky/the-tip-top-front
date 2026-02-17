export interface Gift {
    id: number
    name: string
    image: string
}

export const GIFTS: Gift[] = [
    {
        id: 1,
        name: "Infuseur à thé",
        image: "/images/gifts/infuseur-a-the.webp",
    },
    {
        id: 2,
        name: "Boîte de 100g de thé détox ou d'infusion",
        image: "/images/gifts/boite-the-ou-infusion.webp",
    },
    {
        id: 3,
        name: "Boîte de 100g de thé signature",
        image: "/images/gifts/boite-the-signature.webp",
    },
    {
        id: 4,
        name: "Coffret découverte",
        image: "/images/gifts/coffret-decouverte-39.webp",
    },
    {
        id: 5,
        name: "Coffret découverte signature",
        image: "/images/gifts/coffret-decouverte-69.webp",
    },
]

export const useGifts = () => {
    const getGiftByName = (name: string): Gift | undefined => {
        return GIFTS.find(g =>
            name.toLowerCase().includes(g.name.toLowerCase()) ||
            g.name.toLowerCase().includes(name.toLowerCase())
        )
    }

    const getGiftById = (id: number): Gift | undefined => {
        return GIFTS.find(g => g.id === id)
    }

    return { gifts: GIFTS, getGiftById, getGiftByName }
}