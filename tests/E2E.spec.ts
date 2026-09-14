import { test, expect } from '@playwright/test';
import { LoginPage } from '../support/login-page.js';
import { loginAsStandardUser } from '../support/auth-helper.js';
import { InventoryPage } from '../support/inventory-page.js';
import { CartPage } from '../support/cart-page.js';

test.describe('E2E tests', () => {

test('User can login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page)
    loginPage.goto()
    await loginPage.login("standard_user", "secret_sauce")

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
});

test('User can apply sorting/add product to the cart', async ({page}) => {
    const inventoryPage = new InventoryPage(page)
    await loginAsStandardUser(page)
    await page.goto('https://www.saucedemo.com/inventory.html')
    await inventoryPage.addProductAndSort()
    
    await expect(inventoryPage.appliedSorting).toContainText("Price (low to high)")
    await expect(inventoryPage.basketCount).toContainText("1")
})
test('Order product complete flow', async ({page}) => {
    const cartPage = new CartPage(page)
    await loginAsStandardUser(page)
    await page.goto('https://www.saucedemo.com/inventory.html')
    await cartPage.endToEnd("Nick", "Lock", "30-383")

    await expect(cartPage.thankYouText).toHaveText("Thank you for your order!")
})



})