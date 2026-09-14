import type { Page } from '@playwright/test';

export async function loginAsStandardUser(page: Page) {
    await page.context().addCookies([
        {
            name: 'session-username', 
            value: 'standard_user',   
            domain: 'www.saucedemo.com',
            path: '/',
        }
    ]);
}