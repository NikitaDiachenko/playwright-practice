import {test, expect} from '@playwright/test'
import { GetPhotoDetails } from './support/graphql-operations.js'
import { graphQLRequest } from './support/graphql-client.js'
test.describe('Complex GraphQL tests', () => {
    test('GetPhotoDetails', async ({request}) => {
        const response = await graphQLRequest(request, GetPhotoDetails, {id:"1"} )
        const responseBody = await response.json()
        expect(response.status()).toBe(200)
        expect(responseBody.errors).toBeUndefined()
        expect(responseBody.data.photo.album.user.email).toBeDefined()
        expect(responseBody.data.photo.album.user.name).toBeDefined()
    })
})