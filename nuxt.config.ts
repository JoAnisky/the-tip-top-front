// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ['~/assets/scss/main.scss'],
    modules: ['@nuxt/fonts', '@nuxt/ui'],
    vite: {
      server: {
          allowedHosts: [
              process.env.DOMAIN || 'localhost',
              'localhost',
              '.local'
          ]
      }
    },
    app: {
        head: {
            title: 'Grand jeu concours Thé Tip Top Nice - Gagnez 1 an de thé bio premium', // default fallback title
            htmlAttrs: {
                lang: 'fr',
            },
            ogImage: '/images/og.jpg',
        },
    },
})