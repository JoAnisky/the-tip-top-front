// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    future: {compatibilityVersion: 4},
    css: ['~/assets/scss/main.scss'],
    modules: ['@nuxtjs/tailwindcss', '@nuxt/fonts'],
    vite: {
      server: {
          allowedHosts: [
              process.env.DOMAIN || 'localhost',
              'localhost',
              '.local'
          ]
      }
    },
})