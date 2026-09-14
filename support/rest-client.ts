import type { APIRequestContext } from "@playwright/test";
const baseURL = "https://dummyjson.com/products"
export async function getRequest(
    request: APIRequestContext,
    headers?: String,
    params?: any
) {
    const response = await request.get(baseURL, {
        data:{
            headers,
            params
        }
    })
    return response
}