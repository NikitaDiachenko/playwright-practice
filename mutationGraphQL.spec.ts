import {test, expect} from "@playwright/test"

test.describe('Mutation checks', () => {
    test('Create Post Mutation', async ({request}) => {
       const mutation = `
    mutation CreatePost($input: CreatePostInput!) {
        createPost(input: $input) {
            id
            title
            body
        }
    }
`
        const response = await request.post("https://graphqlzero.almansi.me/api", {
            data: {
            query:mutation,
            variables:{
                input: {
                    title:"Playwright & GraphQL",
                    body: "Body"
                }
            }
            }
        })
        expect(response.status()).toBe(200)
        const result = await response.json()
        expect(result.data.createPost.id).toBeDefined()
        expect(result.data.createPost.title).toBe("Playwright & GraphQL")
        expect(result.data.createPost.body).toBe("Body")
    })
})