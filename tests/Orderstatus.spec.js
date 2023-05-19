import { test, expect } from '@playwright/test';

test.describe('test', () => {

    

    let page;
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();

    });

test('Order Status', async ({ page }) => {

    await page.goto('https://portal-test.goya.com/oms2/#/home')
    //Add assertions to check element
    await expect(page.getByPlaceholder('Username')).toHaveCount(1);
    await expect(page.getByPlaceholder('Password')).toHaveCount(1);
    await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();

    await page.getByPlaceholder('Username').fill('013506');
    await page.getByPlaceholder('Password').fill('Pwd@013506');
    await page.getByRole('button', { name: 'Login' }).click();
    //Addd assertions to verify the URL of the home page .
    await expect(page).toHaveURL('https://portal-test.goya.com/oms2/#/home');

    await page.getByRole('button', { name: 'Order', exact: true }).click();
    await page.getByRole('searchbox', { name: 'Customer' }).click();
    await page.getByText('712457-RUMBA CUBANA OF TONNELLE CORP').click();
    
    await page.getByRole('textbox', { name: 'Item / UPC#' }).click();
    await page.getByRole('textbox', { name: 'Item / UPC#' }).fill('2365');
    await page.getByPlaceholder('Cases').press('Tab');
    await page.getByRole('textbox', { name: 'Item / UPC#' }).fill('2465');
    await page.getByPlaceholder('Cases').press('Tab');
    await page.getByRole('link', { name: 'Order Status' }).click();

    await page.waitForTimeout(11000)
    await page.getByRole('cell', { name: '356303352 (W)' }).click();
    await page.screenshot({ path: "Pdf.png", fullPage: true })
    const downloadPromise = page.waitForEvent('download');
    await page.locator('#pdf').getByText('PDF').click();
    const download = await downloadPromise;
    page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
    });
    await page.locator('#pdf').getByText('Email').click();
    await page.locator('#pdf').getByText('Close').click();
    await page.locator('.table > tbody > tr > td:nth-child(3)').first().click();
    await page.screenshot({ path: "Popup.png", fullPage: true})
    await page.getByRole('button', { name: 'Close' }).click();
    
    await page.locator('.delete-icon').first().click();
    await page.screenshot({ path: "Cancel.png", fullPage: true})
    await page.getByRole('button', { name: 'No' }).click();
    
    await page.getByRole('listitem').filter({ hasText: 'Home' }).getByRole('link', { name: 'Home' }).click();
    await page.getByRole('button', { name: '013506-CARLOS MORATO' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
    await page.goto('https://portal-test.goya.com/oms2/#/login');
});
})

  
  