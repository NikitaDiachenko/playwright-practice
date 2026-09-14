import {test, expect} from "@playwright/test"

test.describe("Advanced API checks", () => {
    test('should update an existing user', async ({request}) => {
        const response = await request.put("https://dummyjson.com/users/1", {
            data: {
                firstName: "updatedName"
            }
        })
        expect(response.status()).toBe(200)
        const body = await response.json()
        expect(body.firstName).toBe("updatedName")
    })
    test ('should delete a user', async ({request}) => {
        const response = await request.delete("https://dummyjson.com/users/1")
        expect(response.status()).toBe(200)

        const body = await response.json()
        expect(body.isDeleted).toBe(true)
        expect(body.deletedOn).toBeDefined()
        expect(body.id).toBe(1)
    })
    test ('should return 404 for non-existent user', async ({request}) => {
        const response = await request.get("https://dummyjson.com/users/99999")
        expect(response.status()).toBe(404)
    })
})