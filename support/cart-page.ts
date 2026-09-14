import type { Page, Locator } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly shoppingCartBtn: Locator;
    readonly checkoutBtn: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueBtn: Locator;
    readonly finishBtn: Locator;
    readonly thankYouText: Locator;

    constructor (page:Page) {
    this.page = page;
    this.shoppingCartBtn = page.locator("//*[@data-test='shopping-cart-link']")
    this.checkoutBtn = page.locator("//*[@data-test='checkout']")
    this.firstName = page.locator("//*[@data-test='firstName']")
    this.lastName = page.locator("//*[@data-test='lastName']")
    this.postalCode = page.locator("//*[@data-test='postalCode']")
    this.continueBtn = page.locator("//*[@data-test='continue']")
    this.finishBtn = page.locator("//*[@data-test='finish']")
    this.thankYouText = page.locator("//*[@data-test='complete-header']")
    }
    async endToEnd (firstName: string, lastName: string, postalCode: string) {
        await this.shoppingCartBtn.click()
        await this.checkoutBtn.click()
        await this.firstName.fill(firstName)
        await this.lastName.fill(lastName)
        await this.postalCode.fill(postalCode)
        await this.continueBtn.click()
        await this.finishBtn.click()
    }
}
