import {expect, test} from "@playwright/test"

test.describe('REST suite', () => {
    test('Success Post creation', async ({request}) => {
        const response = await request.post("https://jsonplaceholder.typicode.com/posts", {
            data: {
                "title": "Playwright API Test",
                "body": "Learning API automation",
                "userId": 1
            }
        })
        expect(response.status()).toBe(201)
        const result = await response.json()
        expect(result.userId).toBe(1)
        expect(result.body).toBe("Learning API automation")
        expect(result.title).toBe("Playwright API Test")
        expect(result.id).toBeDefined()
    })
    test('get and filter data', async ({request}) => {
        const response = await request.get("https://jsonplaceholder.typicode.com/posts", {
            params:{
                "userId": 1
            }
        })
        expect(response.status()).toBe(200)
        const result = await response.json()
        expect(result.length).toBeGreaterThan(0)
        for (let i = 0; i < result.length; i++){
            expect(result[i].userId).toBe(1)
        }
    })
    test('partial update post', async ({request}) => {
        const response = await request.patch("https://jsonplaceholder.typicode.com/posts/1", {
            data:{
                "title": "NEW VALUE"
            }
        })
        expect(response.status()).toBe(200)
        const result = await response.json()
        expect(result.title).toBe("NEW VALUE")
    })

    test('get non-existent post', async ({request}) => {
        const response = await request.get("https://jsonplaceholder.typicode.com/posts/999999")
        expect(response.status()).toBe(404)
    })

   
})