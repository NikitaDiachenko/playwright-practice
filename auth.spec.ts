import {test, expect} from "@playwright/test"

test.describe('login with bearer token', () => {
    test('should login, get token and access protected endpoint', async({request}) => {
        const response = await request.post('https://dummyjson.com/auth/login',{
            data: {
                username: 'emilys',
                password: 'emilyspass'
            }
        })
        expect(response.status()).toBe(200)
        const body = await response.json()
        const authToken = body.accessToken
        expect(body.accessToken).toBeDefined()
        const authResponse = await request.get('https://dummyjson.com/auth/me', {
            headers: {
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/json'
            }
        })
        expect(authResponse.status()).toBe(200)
        const authBody = await authResponse.json()
        expect(authBody.username).toBe('emilys')
        expect(authBody.email).toBeDefined()
    })
})