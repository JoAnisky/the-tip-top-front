// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'app/',
  devtools: { enabled: true },

  vite: {
      server: {
          allowedHosts: [
              process.env.DOMAIN || 'localhost',
              'localhost',
              '.local'
          ]
      }
  },

  modules: ['@nuxtjs/tailwindcss']
})