import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';


export interface ApiError<T> extends AxiosError<T> {
  error?: string
};

export interface ApiResponse<T> extends AxiosResponse<T> {
  loading: boolean;
  error: string | null;
};

export interface ApiRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean; // For token refresh scenarios
  skipAuth?: boolean; // Custom flag to skip auth header
  metadata?: {
    requestStartTime?: number;
  };
};