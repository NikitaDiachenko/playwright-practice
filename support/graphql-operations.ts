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
export const CharacterDetails = `query Character ($id:ID!){
    character(id: $id) {
        id
        name
        status
        species
        origin {
            name
        }
    }
}`
export const CharactersArray = `query Characters ($page: Int){
    characters(page: $page) {
        results {
            id
            name
            gender
        }
    }
}`
export const CreatePost = `mutation CreatePost ($input:CreatePostInput!){
    createPost(input: $input) {
        id
        title
        body
    }
}`
export const UpdatePost = `mutation UpdatePost ($id:ID!, $input: UpdatePostInput!){
    updatePost(id: $id, input: $input) {
        title
        id
    }
}`