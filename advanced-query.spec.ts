import {test, expect} from "@playwright/test"
import { getRequest } from "./support/rest-client.js"

test.describe("Advanced Rest API tests", () => {
    test('should handle pagination and return correct metadata', async ({request}) => {
        const response = await getRequest(request,undefined,{limit: 5,skip:5})

        expect(response.status()).toBe(200)

        const body = await response.json()
        expect(body.limit).toBe(5)
        expect(body.skip).toBe(5)
        expect(body.total).toBeGreaterThan(0)
        expect(body.products.length).toBe(5)
    })
    test('should return products matching search query case-insensitively', async({request}) => {
        const response = await request.get('https://dummyjson.com/products/search', {
            params: {
                q: 'phone'
            }
        })
        expect(response.status()).toBe(200)

        const body = await response.json()
        expect(body.products.length).toBeGreaterThan(0)
        const allowedCategories = ["mobile-accessories", "smartphones"]
        for(let i = 0; i < body.products.length; i++){
            expect(allowedCategories).toContain(body.products[i].category)
        }
    })
})