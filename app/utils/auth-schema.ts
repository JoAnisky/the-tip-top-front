import { z } from 'zod'

// Base commune pour connexion / inscription
export const loginSchema = z.object({
    email: z.string()
        .email('Email invalide')
        .min(1, 'L\'email est requis'),
    password: z.string()
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
})

// Schéma d'inscription basé sur l'entité User
export const registerSchema = z.object({
    firstName: z.string()
        .min(2, 'Le prénom est trop court')
        .max(255),
    lastName: z.string()
        .min(2, 'Le nom est trop court')
        .max(255),
    email: z.string()
        .email('Email invalide'),
    // plainPassword correspond au champ dans l'entité Symfony
    plainPassword: z.string()
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
    // Pour la confirmation dans le formulaire (non envoyé à l'API)
    confirmPassword: z.string(),

    // Champs optionnels présents dans l'entité User
    phoneNumber: z.string().max(20).nullable().optional(),
    city: z.string().max(150).nullable().optional(),
    postalCode: z.string().max(20).nullable().optional(),
    country: z.string().max(180).nullable().optional(),

    // Validation des conditions générales
    acceptTerms: z.literal(true, {
        errorMap: () => ({ message: 'Vous devez accepter les conditions générales d\'utilisation' }),
    }),
}).refine((data) => data.plainPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
})