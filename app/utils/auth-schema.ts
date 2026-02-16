import { z } from 'zod'

const requiredMsg = "Ce champ est requis"

export const loginSchema = z.object({
    email: z.string({ required_error: requiredMsg })
        .min(1, 'Saisissez votre adresse email')
        .email('Email invalide'),
    password: z.string({ required_error: requiredMsg })
        .min(1, 'Saisissez votre mot de passe')
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
})

export const registerSchema = z.object({
    gender: z.enum(['male', 'female'], {
        required_error: "Veuillez sélectionner votre civilité"
    }),
    firstName: z.string({ required_error: requiredMsg })
        .min(1, 'Saisissez votre prénom')
        .min(2, 'Le prénom est trop court'),
    lastName: z.string({ required_error: requiredMsg })
        .min(1, 'Saisissez votre nom')
        .min(2, 'Le nom est trop court'),

    birthDate: z.string({ required_error: "La date de naissance est requise" })
        .min(1, 'La date de naissance est requise')
        .refine((date) => {
            const birth = new Date(date);
            const now = new Date();
            // la date doit être dans le passé et l'utilisateur doit avoir un âge réaliste
            return birth < now && birth > new Date('1900-01-01');
        }, { message: "Date de naissance invalide" }),

    email: z.string({ required_error: requiredMsg })
        .min(1, 'Saisissez votre adresse email')
        .email('Email invalide'),

    // Pour la mise à jour, on rend les mots de passe optionnels
    plainPassword: z.string().min(8, 'Minimum 8 caractères').optional().or(z.literal('')),
    confirmPassword: z.string().optional().or(z.literal('')),

    city: z.string().max(150).nullable().optional(),
    postalCode: z.string()
        .max(20)
        .regex(/^(?:[0-8]\d|9[0-8]|2[AB])\d{3}$/, "Code postal invalide")
        .optional()
        .or(z.literal('')) // Autorise explicitement la chaîne vide sans déclencher la regex (état initial)
        .transform(val => val === '' ? null : val),
    address: z.string().max(255).nullable().optional(),

    newsletter: z.boolean().default(false),

    // On garde acceptTerms car requis à l'inscription
    acceptTerms: z.boolean().optional(),
}).refine((data) => {
    // On ne valide la correspondance que si un nouveau mot de passe est saisi
    if (data.plainPassword) {
        return data.plainPassword === data.confirmPassword;
    }
    return true;
}, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
})