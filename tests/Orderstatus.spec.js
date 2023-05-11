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
    //Add assertions to verify the URL of the home page .
    await expect(page).toHaveURL('https://portal-test.goya.com/oms2/#/home');

    await expect(page.getByRole('button', { name: 'Order Status', exact: true })).toBeEnabled();
    await page.getByRole('button', { name: 'Order Status' }).click();
    await page.getByRole('cell', { name: '356302451 (W)' }).click();
    const downloadPromise = page.waitForEvent('download');
    await page.locator('#pdf').getByText('PDF').click();
    const download = await downloadPromise;
    page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('#pdf').getByText('Email').click();
  await page.locator('#pdf').getByText('Close').click();
  
  await page.getByRole('listitem').filter({ hasText: 'Home' }).getByRole('link', { name: 'Home' }).click();
  await page.getByRole('button', { name: '013506-CARLOS MORATO' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
  await page.goto('https://portal-test.goya.com/oms2/#/login');
});
})

  
  