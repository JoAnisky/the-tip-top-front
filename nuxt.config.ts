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
            title: 'Grand Jeu concours Thé Tip Top', // default fallback title
            htmlAttrs: {
                lang: 'fr',
            },
        },
    },
})