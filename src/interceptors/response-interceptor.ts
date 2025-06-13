import { ApiResponse, ApiError } from "../interfaces";


const handleResponseInterception = <T>(response: ApiResponse<T>) => {
    //logger.resLog(response);

    return response;
};

const handleResponseErrorInterception = <T>(error: ApiError<T>) => {
    //logger.errLog(error);
    if (error.response) {
        const { status } = error.response;

        if (status === 500) {
            return status;
        }
    }

    return Promise.reject(error);
};

export const responseInterceptors = [handleResponseInterception, handleResponseErrorInterception];

// client.interceptors.response.use(
//   (response: AxiosResponse<ApiResponse>): AxiosResponse => {
//     console.log(`API Reponse: Received`); 
//     // ... interceptor logic
//     return response;
//   },
//   (error: AxiosError<ApiError>): Promise<never> => {
//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized access (e.g., redirect to login)
//     //   if (typeof window !== 'undefined') {
//     //     window.location.href = '/login';
//     //   }
//     }
//     // Example: extract error message from common API error formats
//     const errorMessage = error.response?.data?.message || 
//                          error.response?.data?.error || 
//                          error.message || 
//                          'Something went wrong';
//     console.log(`API Error: ${errorMessage}`);
//     return Promise.reject(error);
//   }
// );