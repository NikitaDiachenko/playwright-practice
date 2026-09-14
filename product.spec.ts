import { test, expect } from '@playwright/test';

interface CreateProductResponse {
    id: number
    title: string
    price: number
}
test.describe('Products API CRUD', () => {

test('fetch single product', async ({ request }) => {

const response = await request.get('https://dummyjson.com/products/1');
const body = await response.json()

expect(response.status()).toBe(200)
expect(body.id).toBe(1)
expect(body.price).toBeGreaterThan(1)
});

test('create a new prodcut', async ({ request }) => {

const response = await request.post('https://dummyjson.com/products/add', {
    data: {
         title: 'Mechanical Keyboard', 
         price: 120 
    }
}
)
const body: CreateProductResponse = await response.json()

expect(response.status()).toBe(201)
expect(body.id).toBeGreaterThan(0)
expect(body.title).toBe("Mechanical Keyboard")
expect(body.price).toStrictEqual(120)
});

test('search products with query params', async ( {request} ) => {
    const allowedCategories = ["mobile-accessories", "smartphones"]
    const response = await request.get('https://dummyjson.com/products/search',
        {params: {
            q: 'phone'
        }}
    )
    const body = await response.json()

    expect(response.status()).toBe(200)
    expect(body.total).toBeGreaterThan(0)
    expect(body.products.length).toBeGreaterThan(0)
    body.products.forEach((product: { category: string }) => {
    expect(allowedCategories).toContain(product.category);
    });
    })
})