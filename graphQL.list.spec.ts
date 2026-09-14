import {test, expect} from "@playwright/test"

test.describe("filtering by continent with included fields", () => {
    test('filtering by continent check', async ({request}) => {
        const query = `query GetCountriesByContinent($continent: String!) {
        countries(filter: { continent: { eq: $continent } }) {
            code
            name
            capital
            currency
            languages {
                name
            }
        }
    }`

        const response = await request.post("https://countries.trevorblades.com/", {
            data: {
                query:query,
                variables: {
                    continent: 'EU'
                }
            }
        })
        expect(response.status()).toBe(200)
        const result = await response.json()
        expect(result.errors).toBeUndefined()
        expect(result.data.countries.length).toBeGreaterThan(0)
        const hasPoland = result.data.countries.some((country: any) => country.name === 'Poland')
        expect(hasPoland).toBe(true)
    })
    test('Build Query', async ({request}) => {
        const query = `query ToDo ($id: ID!) {
        todo(id: $id) {
        title
        completed
        id
    }
        }`
        const response = await request.post("https://graphqlzero.almansi.me/api",{
            data:{
                query: query,
                variables:{
                    id:"1"
                }
            }
        })
        expect(response.status()).toBe(200)
        const result = await response.json()
        expect(result.data.todo.id).toBeDefined()
        expect(result.data.todo.completed).toBeDefined()
    })
})