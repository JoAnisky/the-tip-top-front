import { test, expect } from '@playwright/test'

test('login puis soumission d\'un code gagnant', async ({ page }) => {
    // ------- POUR DEBUG  ------- \\
    // page.on('request', req => {
    //     if (req.url().includes('auth')) {
    //         console.log('REQUEST:', req.method(), req.url())
    //     }
    // })
    // page.on('response', async res => {
    //     if (res.url().includes('auth')) {
    //         console.log('RESPONSE:', res.status(), res.url())
    //     }
    // })
    // page.on('response', async res => {
    //     if (res.url().includes('auth/login')) {
    //         const headers = res.headers()
    //         console.log('LOGIN HEADERS:', JSON.stringify(headers, null, 2))
    //     }
    // })

    // Etape 1 : aller sur la page login
    await page.goto('/login')

    // Fermer la bannière cookie en premier
    await page.getByRole('button', { name: 'Tout refuser' }).click()

    // 2 : remplir le formulaire de login
    await page.getByRole('textbox', { name: 'Adresse email' }).click()
    await page.keyboard.type(process.env.TEST_USER_EMAIL)

    await page.getByRole('textbox', { name: 'Mot de passe' }).click()
    await page.keyboard.type(process.env.TEST_USER_PASSWORD)

    await page.getByRole('button', { name: 'Se connecter' }).click()

    // 3 : On vérifie qu'on est bien redirigé vers la page profil
    await page.waitForURL('/profile', { timeout: 8000 })

    // 4 : Soumettre un code gagnant
    await page.getByPlaceholder('Code unique à 10 caractères').fill(process.env.TEST_WIN_CODE)
    await page.getByRole('button', { name: 'Lancer la roue' }).click()

    // 5 Attendre la modale de victoire spécifiquement, grâce à son "Heading"
    await expect(page.getByRole('heading', { name: 'Félicitations' })).toBeVisible({ timeout: 10000 })
})