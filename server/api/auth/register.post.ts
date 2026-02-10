export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const body = await readBody(event)

    try {
        return await $fetch(`${config.apiBaseUrl}/auth/register`, {
            method: 'POST',
            body: {
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
            },
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 400,
            message: error.data?.message || 'Erreur lors de l\'inscription'
        })
    }
})