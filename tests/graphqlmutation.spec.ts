import {test, expect, request} from "@playwright/test"
import { graphQLRequest } from "../support/graphql-client.js"
import { CreatePost } from "../support/graphql-operations.js"
import { UpdatePost } from "../support/graphql-operations.js"

test.describe('GraphQL mutations', () => {
    test('CreatePost mutation valid input', async ({request}) => {
        const response = await graphQLRequest(request, CreatePost, {input: {title: "blablaTitle", body:"blablaBody"}})
        const result = await response.json()
        expect(response.status()).toBe(200)
        expect(result.data.createPost.id).toBeDefined()
        expect(result.data.createPost.title).toBe("blablaTitle")
        expect(result.data.createPost.body).toBe("blablaBody")
    })
    test('UpdatePost mutation valid input', async({request}) => {
        const response = await graphQLRequest(request, UpdatePost, {id:1, input: {"title":"SMTH", "body": "SMTH"}} )
        expect(response.status()).toBe(200)
        const result = await response.json()
        expect(result.data.updatePost.title).toBe("SMTH")
    })
})