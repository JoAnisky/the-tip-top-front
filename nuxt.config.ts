// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ['~/assets/scss/main.scss'],
    modules: ['@nuxt/fonts', '@nuxt/ui', 'nuxt-og-image'],
    vite: {
      server: {
          allowedHosts: [
              ...(process.env.NUXT_PUBLIC_SITE_URL ? [new URL(process.env.NUXT_PUBLIC_SITE_URL).hostname] : []),
              process.env.DOMAIN || 'localhost',
              'localhost',
              '.local'
          ]
      }
    },
    site: {
        url: 'https://the-tip-top.jonathanlore.fr',
    },
    app: {
        head: {
            title: 'Grand jeu concours Thé Tip Top Nice - Gagnez 1 an de thé bio premium', // default fallback title
            htmlAttrs: {
                lang: 'fr',
            },
        },
    },
})