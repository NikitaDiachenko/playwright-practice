import {test, expect, request} from "@playwright/test"

test.describe('Test Suite GraphQL', () => {
    test('updatePost', async({request}) => {
        const mutation = `mutation UpdatePost ($id:ID!, $input: UpdatePostInput!){
        updatePost(id: $id, input: $input ) {
        id
        title
        body
        }
    }`
    const response = await request.post("https://graphqlzero.almansi.me/api", {
        data:{
            query:mutation,
            variables: {
                id:"1",
                input: {
                    title: "UPDATEDtitle",
                    body: "UPDATEDbody"
                }
            }
        }
    })
    const result = await response.json()
    expect(response.status()).toBe(200)
    expect(result.data.updatePost.id).toBe("1")
    expect(result.data.updatePost.title).toBe("UPDATEDtitle")
    expect(result.data.updatePost.body).toBe("UPDATEDbody")
    })
    test('deleteUser', async ({request}) => {
        const mutation = `mutation DeleteUser ($id:ID!) {
          deleteUser(id: $id)
        }`
        const response = await request.post("https://graphqlzero.almansi.me/api", {
            data:{
                query:mutation,
                variables:{
                    id: "1"
                }
            }
        })
        expect(response.status()).toBe(200)
        const responseBody = await response.json()
        expect(responseBody.data.deleteUser).toBeTruthy()
    })
})