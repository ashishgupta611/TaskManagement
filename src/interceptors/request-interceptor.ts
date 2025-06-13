import { ApiRequestConfig } from "../interfaces";
import { AxiosError, AxiosHeaders } from "axios";


export const handleRequestWithoutAuthHeaderInterception = (config: ApiRequestConfig & {tokenType?: string}) => {
    if (config && config.headers) {
        delete config.tokenType;
        delete config.headers.Authorization;
    }
    return config;
};

// client.interceptors.request.use(
//   (config: ApiRequestConfig) => {

//     // Add request timing
//     config.metadata = { requestStartTime: Date.now() };

//     // Skip auth if requested
//     if (config.skipAuth) return config;

//     // Initialize headers if they don't exist
//     if (!config.headers) {
//       config.headers = new AxiosHeaders();
//     }

//     // Client-side only modifications
//     if (typeof window !== 'undefined') {
//       // Auth token
//       const token = localStorage.getItem('authToken');
//       if (token) {
//         config.headers.set('Authorization', `Bearer ${token}`);
//       }

//       // CSRF token
//       const csrfToken = document.cookie
//         .split('; ')
//         .find(row => row.startsWith('XSRF-TOKEN='))
//         ?.split('=')[1];
      
//       if (csrfToken) {
//         config.headers.set('X-CSRF-TOKEN', csrfToken);
//       }
//     }

//     return config;
//   },
//   (error: AxiosError) => {
//     return Promise.reject(error);
//   }
// );