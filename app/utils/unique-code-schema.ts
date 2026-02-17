import { z } from 'zod';

export const uniqueCodeSchema = z.object({
    code: z.string({required_error: 'Merci de renseigner votre code unique'})
        .trim()
        .length(10, 'Le code unique doit contenir exactement 10 caractères')
        .regex(/^[a-zA-Z0-9]+$/, "Le code ne doit contenir que des lettres et des chiffres")
        .transform(val => val.toUpperCase())
})