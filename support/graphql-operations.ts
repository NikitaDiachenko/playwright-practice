export const ToDos = `query ToDos($options: PageQueryOptions) {
        todos(options: $options) {
        data {
            id
            title
            completed
        }
            meta {
            totalCount
        }
    }
}`
export const CreateTodo = `mutation CreateTodo($input: CreateTodoInput!){
    createTodo(input: $input) {
        id
        completed
        title
    }
}`
export const GetPhotoDetails = `query Photo ($id: ID!){
        photo(id: $id) {
        id
        title
        url
        album {
            id
            title
            user {
                id
                name
                email
            }
        }
    }
}`