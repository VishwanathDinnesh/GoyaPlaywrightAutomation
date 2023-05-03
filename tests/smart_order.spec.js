import { test, expect } from '@playwright/test';


test.describe('test', () => {
    
    let page;
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();

    });

test('Smart Order', async ({ page }) => {

  await page.goto('https://portal-test.goya.com/oms2/#/home');
  //Add assertions to check element
  await expect(page.getByPlaceholder('Username')).toHaveCount(1);
  await expect(page.getByPlaceholder('Password')).toHaveCount(1);
  await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();
  //await page.goto('https://portal-test.goya.com/oms2/#/login');
  await page.getByPlaceholder('Username').fill('013506');
  await page.getByPlaceholder('Password').fill('Pwd@013506');
  await page.getByRole('button', { name: 'Login' }).click();
  //Add assertions to verify the URL of the home page .
  await expect(page).toHaveURL('https://portal-test.goya.com/oms2/#/home');
  await expect(page.getByRole('button', { name: 'Customers', exact: true })).toBeEnabled();
  await page.getByRole('button', { name: 'Customers', exact: true }).click();
  //Add assertions to verify the URL of the Order-Entry page.
  await expect(page).toHaveURL('https://portal-test.goya.com/oms2/#/customer-details');
  await expect(page.getByRole('textbox', { name: 'Search Customer', exact: true})).toBeEnabled
  await page.getByRole('textbox', { name: 'Search Customer', exact: true }).click();
  await page.getByRole('textbox', { name: 'Search Customer' }).fill('701631');
  await page.getByRole('row', { name: '701631 RUMBA CUBANA (JC) A $490.29 Customer Statement Preview' }).getByRole('radio').check();
  await page.getByRole('row', { name: '701631 RUMBA CUBANA (JC) A $490.29 Customer Statement Preview' }).getByRole('radio').press('ScrollLock');
  await page.getByRole('button', { name: 'Select' }).click();
  await page.getByRole('button', { name: 'Proceed' }).click();
  //Add assertions to verify the URL of the home page .
  await expect(page).toHaveURL('https://portal-test.goya.com/oms2/#/home');
  await expect(page.getByRole('button', {name: 'Smart Order', exact: true})).toBeEnabled
  await page.getByRole('button', { name: 'Smart Order' }).click();
  await page.waitForTimeout(15000);
  await expect(page.getByRole('link', {name: 'New Items', exact: true})).toBeEnabled
  await page.getByRole('link', { name: 'New Items' }).click();
  await page.waitForTimeout(2000)
  await page.screenshot({ path: "New Items.png", fullPage: true })
  await page.getByRole('link', { name: 'X' }).click();
  await expect(page.getByRole('link', {name: 'Promo Items', exact: true})).toBeEnabled
  await page.getByRole('link', { name: 'Promo Items' }).click();
  await page.waitForTimeout(2000)
  await page.screenshot({ path: "Promo Items.png", fullPage: true })
  await page.getByRole('link', { name: 'X' }).click();
  await expect(page.getByRole('link', {name: 'Price Change', exact: true})).toBeEnabled
  await page.getByRole('link', { name: 'Price Change' }).click();
  await page.getByRole('link', { name: 'X' }).click();
  await page.getByRole('paragraph').filter({ hasText: '701631-RUMBA CUBANA (JC)' }).click();
  await page.getByRole('option', { name: '712450-SHOP RITE 130' }).locator('div').filter({ hasText: '712450-SHOP RITE 130' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL('https://portal-test.goya.com/oms2/#/home');

  
});
})
  