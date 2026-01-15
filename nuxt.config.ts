// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    future: {compatibilityVersion: 4},
    modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts'],
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