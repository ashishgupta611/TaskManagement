// import axios, {
//   AxiosInstance,
//   AxiosRequestConfig,
//   AxiosResponse,
//   AxiosError,
// } from 'axios';
// import { getSession } from 'next-auth/react'; // If using NextAuth.js
// // or your auth token getter:
// // import { getAuthToken } from './auth';

// // Import types
// import { ApiResponse, ApiError } from '../interfaces';

// // Get base URL from environment variables
// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

// class AxiosService {
//   private instance: AxiosInstance;

//   constructor() {
//     this.instance = axios.create({
//       baseURL: BASE_URL,
//       timeout: 10000,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     this.initializeInterceptors();
//   }

//   private initializeInterceptors(): void {
//     // Request interceptor
//     this.instance.interceptors.request.use(
//       async (config) => {
//         // Add auth token if available
//         const session = await getSession();
//         // or const token = getAuthToken();
//         if (session?.user?.accessToken) {
//           config.headers.Authorization = `Bearer ${session.user.accessToken}`;
//         }
//         return config;
//       },
//       (error: AxiosError) => {
//         return Promise.reject(error);
//       }
//     );

//     // Response interceptor
//     this.instance.interceptors.response.use(
//       (response: AxiosResponse) => {
//         return response.data;
//       },
//       (error: AxiosError) => {
//         const apiError: ApiError = {
//           message: error.message,
//           status: error.response?.status || 500,
//           data: error.response?.data,
//         };
//         return Promise.reject(apiError);
//       }
//     );
//   }

//   public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
//     return this.instance.get(url, config);
//   }

//   public async post<T>(
//     url: string,
//     data?: unknown,
//     config?: AxiosRequestConfig
//   ): Promise<T> {
//     return this.instance.post(url, data, config);
//   }

//   public async put<T>(
//     url: string,
//     data?: unknown,
//     config?: AxiosRequestConfig
//   ): Promise<T> {
//     return this.instance.put(url, data, config);
//   }

//   public async patch<T>(
//     url: string,
//     data?: unknown,
//     config?: AxiosRequestConfig
//   ): Promise<T> {
//     return this.instance.patch(url, data, config);
//   }

//   public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
//     return this.instance.delete(url, config);
//   }
// }

// // Create a singleton instance
// export const axiosService = new AxiosService();