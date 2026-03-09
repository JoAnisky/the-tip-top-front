import { test, expect } from '@playwright/test'

test('login puis soumission d\'un code gagnant', async ({ page }) => {
    // Etape 1 : aller sur la page login
    await page.goto('/login')

    // 2 : remplir le formulaire de login
    await page.getByLabel('Email').fill(process.env.TEST_USER_EMAIL)
    await page.getByLabel('Mot de passe').fill(process.env.TEST_USER_PASSWORD)
    await page.getByRole('button', { name: 'Se connecter' }).click()

    // 3 : On vérfie qu'on est bien redirigé vers la page profil
    await expect(page).toHaveUrl('/profile')

    // 4 : Soumettre un code gagnant
    await page.getByPlaceHolder('Code unique à 10 caractères').fill(process.env.TEST_WIN_CODE)
    await page.getByRole('button', { name: 'Lancer la roue' }).click()

    // 5 : on attend que la modale s'ouvre (après la roue)
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 10000 })
})