import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

dotenv.config({ path: resolve(__dirname, '.env.test') })

export default defineConfig({
    testDir: './tests/e2e',
    outputDir: 'test-results/playwright/artifacts',
    reporter: [
        ['junit', { outputFile: 'test-results/playwright/junit.xml' }],
        ['html', { open: 'never' }],
    ],
    use: {
        baseURL: process.env.BASE_URL || 'http://the-tip-top.front.dev.local:3000',
        screenshot: 'only-on-failure',
        ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? {
            launchOptions: {
                executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
            }
        } : {})
    }
})