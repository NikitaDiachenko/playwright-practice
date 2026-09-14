import type {Page, Locator} from "@playwright/test"

export class InventoryPage {
    readonly page : Page;
    readonly sorting: Locator;
    readonly appliedSorting: Locator;
    readonly basketCount: Locator;
    readonly addProduct:Locator;

    constructor (page:Page){
        this.page = page;
        this.sorting = page.locator("//select[@data-test='product-sort-container']")
        this.basketCount = page.locator("//span[@data-test='shopping-cart-badge']")
        this.appliedSorting = page.locator("//span[@data-test='active-option']")
        this.addProduct = page.locator("//button[@data-test='add-to-cart-sauce-labs-onesie']")
    }

    async addProductAndSort() {
        await this.sorting.selectOption('lohi')
        await this.addProduct.click()
    }
}
