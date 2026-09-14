import {expect, test} from "@playwright/test"
import { graphQLRequest } from "../support/graphql-client.js"
import { CharacterDetails, CharactersArray } from "../support/graphql-operations.js"
test.describe('GraphQL final test', () => {
    test('GraphQL query with arguments and variables', async ({request}) => {
        const response = await graphQLRequest(request, CharacterDetails, {id: 1})
        const result = await response.json()
        expect(response.status()).toBe(200)
        expect(result.data.character.name).toBe("Rick Sanchez")
        expect(result.data.character.status).toBe("Alive")
    })
    test('GraphQL query characters array', async ({request}) => {
        const response = await graphQLRequest(request, CharactersArray, {page:1})
        const result = await response.json()
        expect(response.status()).toBe(200)
        expect(result.data.characters.results.length).toBeGreaterThan(0)
        for (let i = 0; i < result.data.characters.results.length; i++){
            expect(result.data.characters.results[i].name).toBeDefined()
        }
    })
})