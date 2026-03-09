import { defineConfig } from '@playwright/test'

export default defineConfig({
    testDir: './tests/e2e',
    use: {
        baseUrl: process.env.BASE_URL || 'http://the-tip-top.front.dev.local',
    }
})