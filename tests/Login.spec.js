import { test, expect } from '@playwright/test'

test.describe('test', () => {

    

    let page;
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();

    });
    
    test('Login Logout2', async () => {

        await page.goto('https://portal-test.goya.com/oms2/#/home')
        //Add asssertions to check element
        await expect(page.getByPlaceholder('Username')).toHaveCount(1);
        await expect(page.getByPlaceholder('Password')).toHaveCount(1);
        await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();

        await page.getByPlaceholder('Username').fill('013506');
        await page.getByPlaceholder('Password').fill('Pwd@013506');
        await page.getByRole('button', { name: 'Login' }).click();
        //Addd asssertions to verify the URL of the home page .
        await expect(page).toHaveURL('https://portal-test.goya.com/oms2/#/home');
        await page.getByRole('button', { name: '013506-CARLOS MORATO' }).click();
        await page.getByRole('link', { name: 'Logout' }).click();
        //Addd asssertion to verify that after logout we are getting back to the login screen.
        await expect(page).toHaveURL('https://portal-test.goya.com/oms2/#/login');
        //await page.close();
        //upload GIT

    })
})