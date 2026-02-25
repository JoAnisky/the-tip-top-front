export function useSeoPage(meta: {
    title: string
    description: string
    noindex?: boolean
}) {
    const config = useRuntimeConfig()
    const route = useRoute()
    const canonical = `${config.public.siteUrl}${route.path}`

    useSeoMeta({
        title: meta.title,
        description: meta.description,
        ogTitle: meta.title,
        ogDescription: meta.description,
        ogUrl: canonical,
        robots: meta.noindex ? 'noindex, nofollow' : 'index, follow',
    })

    useHead({
        link: [{ rel: 'canonical', href: canonical }],
    })
}