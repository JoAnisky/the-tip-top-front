import { defineConfig } from 'vitest/config'
import { defineVitestProject } from '@nuxt/test-utils/config'

/**
 * Config Vitest avec 3 projets séparés :
 *
 * - unit       : logique pure, environment Node (rapide, sans Nuxt)
 * - functional : comportements DOM, environment jsdom (sans Nuxt)
 * - nuxt       : composables avec auto-imports Nuxt réels (useState, $fetch, navigateTo…)
 *
 * Les tests dans tests/nuxt/ ont accès au runtime Nuxt complet —
 * pas besoin de mocker manuellement les globals Nuxt.
 */
export default defineConfig({
    test: {
        projects: [
            // --- Tests unitaires purs (Node, sans Nuxt) ---
            {
                test: {
                    name: 'unit',
                    include: ['tests/unit/**/*.spec.ts'],
                    environment: 'node',
                },
            },

            // --- Tests fonctionnels DOM (jsdom, sans Nuxt) ---
            {
                test: {
                    name: 'functional',
                    include: ['tests/functional/**/*.spec.ts'],
                    environment: 'jsdom',
                    globals: true,
                },
            },

            // --- Tests d'intégration avec runtime Nuxt réel ---
            await defineVitestProject({
                test: {
                    name: 'nuxt',
                    include: ['tests/nuxt/**/*.spec.ts'],
                    environment: 'nuxt',
                    environmentOptions: {
                        nuxt: {
                            overrides: {
                                experimental: {
                                    appManifest: false
                                }
                            }
                        }
                    }
                },
            }),
        ],
    },
})