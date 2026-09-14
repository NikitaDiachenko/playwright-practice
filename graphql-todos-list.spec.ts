import {test, expect} from "@playwright/test"
import { ToDos, CreateTodo } from "./support/graphql-operations.js" 
import { graphQLRequest } from "./support/graphql-client.js"

test.describe("ToDo queries tests", () => {
    test('GetTodos', async ({request}) => {
    const response = await graphQLRequest(request, ToDos, {options:{paginate: {limit:10}}})

    expect(response.status()).toBe(200)
    const body = await response.json()
    expect(body.data.todos.data.length).toBe(10)
    expect(body.errors).toBeUndefined()
    expect(body.data.todos.meta.totalCount).toBeDefined()
    })
    test('CreateNewToDo test', async ({request})=>
    {
    const response = await graphQLRequest(request, CreateTodo, {input:{title:"SMTHNEW",completed:false}})
    const result = await response.json()
    expect(response.status()).toBe(200)
    expect(result.data.createTodo.id).toBeDefined()
    expect(result.data.createTodo.completed).toBeFalsy()
    expect(result.data.createTodo.title).toBe("SMTHNEW")

    })
})