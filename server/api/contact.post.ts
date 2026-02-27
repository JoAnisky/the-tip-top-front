import { contactSchema } from "~/utils/contact-schema";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const body = await readBody(event)

    const parsed = contactSchema.safeParse(body)
    if(!parsed.success) {
        throw createError({ statusCode: 400, message: 'Données invalides' })
    }

    await $fetch(`${config.apiBaseUrl}/api/contact`, {
        method: 'POST',
        body: parsed.data,
    })

    return { success : true}
})