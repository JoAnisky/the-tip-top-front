// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ['~/assets/scss/main.scss'],
    modules: ['@nuxt/fonts', '@nuxt/ui', 'nuxt-og-image', '@nuxtjs/sitemap'],

    runtimeConfig: {
        // variables privées (server-side only)
        apiBaseUrl: process.env.NUXT_API_BASE_URL || 'http://localhost:8000',

        // variables publiques (client + server)
        public: {
            apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
            siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
        }
    },

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
        url: process.env.NUXT_PUBLIC_SITE_URL || 'https://the-tip-top.jonathanlore.fr',
        name: 'Thé Tip Top',
    },
    app: {
        head: {
            titleTemplate: '%s — Thé Tip Top',
            title: 'Grand jeu concours — Gagnez 1 an de thé bio premium', // fallback homepage
            htmlAttrs: { lang: 'fr' },
            meta: [
                { name: 'robots', content: 'index, follow' }, // défaut global
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            ],
        },
    },
    sitemap: {
        exclude: [
            '/admin',
            '/employe',
            '/profile',
            'login'
        ]
    }
})