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
        .min(2, 'Le prénom est trop court (min 2 caractères)'),
    lastName: z.string({ required_error: requiredMsg })
        .min(1, 'Saisissez votre nom')
        .min(2, 'Le nom est trop court (minimum 2 caractères)'),
    email: z.string({ required_error: requiredMsg })
        .min(1, 'Saisissez votre adresse email')
        .email('Email invalide'),
    plainPassword: z.string({ required_error: requiredMsg })
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
    confirmPassword: z.string({ required_error: requiredMsg })
        .min(1, 'Veuillez confirmer votre mot de passe'),

    // Champs optionnels présents dans l'entité User
    phoneNumber: z.string().max(20).nullable().optional(),
    city: z.string().max(150).nullable().optional(),
    postalCode: z.string().max(20).nullable().optional(),
    country: z.string().max(180).nullable().optional(),

    // Validation des conditions générales
    acceptTerms: z.literal(true, {
        errorMap: () => ({ message: 'Vous devez accepter les conditions générales d\'utilisation' }),
    }),
    newsletter: z.boolean().default(false),
}).refine((data) => data.plainPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
})