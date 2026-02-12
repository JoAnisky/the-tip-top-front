// server/api/auth/register.post.ts
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const body = await readBody(event)

    try {
        const response = await fetch(`${config.apiBaseUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                email: body.email,
                plainPassword: body.plainPassword,
                firstName: body.firstName,
                lastName: body.lastName,
                gender: body.gender,
                birthDate: body.birthDate,
                phoneNumber: body.phoneNumber,
                address: body.address,
                city: body.city,
                postalCode: body.postalCode,
                newsletter: body.newsletter
            })
        })

        const data = await response.json()

        if (!response.ok) {
            console.error('❌ Erreur Symfony:', data)
            throw createError({
                statusCode: response.status,
                message: data.message || 'Erreur lors de l\'inscription',
                data: data.errors || {}
            })
        }

        // Renvoie les données au client
        return {
            success: true,
            user: data.user,
            message: 'Inscription réussie'
        }

    } catch (error: any) {
        console.error('❌ Erreur register:', error)
        throw createError({
            statusCode: error.statusCode || 400,
            message: error.message || 'Erreur lors de l\'inscription'
        })
    }
})