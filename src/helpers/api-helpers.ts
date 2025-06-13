import { ApiResponse } from "../interfaces";


export const handleResponse = <T>(response: ApiResponse<T>) => ({
    status: response.status,
    data: response.data,
    arguments: response.request?.responseURL,
});

export const handleResponseWithHeaders = <T>(response: ApiResponse<T>) => ({
    status: response.status,
        data: response.data,
        arguments: response.request?.responseURL,
        headers: response.headers,
});

