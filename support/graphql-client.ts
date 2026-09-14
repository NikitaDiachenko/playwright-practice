import type { APIRequestContext } from "@playwright/test"

export async function graphQLRequest(
    request: APIRequestContext, 
    query: string, 
    variables?: Record<string, any>
) {
    const response = await request.post("/api", {
        data: {
            query,
            variables
        }
    });
    return response;
}