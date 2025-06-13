import axios, { AxiosInstance, AxiosHeaders, ParamsSerializerOptions } from "axios";
import { AcceptType, ContentType, PolicyType, RequestHeader } from "../enums";
import { API } from "../constants";
import { responseInterceptors } from "../interceptors/response-interceptor";
import { handleRequestWithoutAuthHeaderInterception } from "../interceptors/request-interceptor";

axios.defaults.headers.common = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
};

const requestHeaders = {
    [RequestHeader.ACCEPT]: AcceptType.JSON,
    [RequestHeader.CONTENT_TYPE]: ContentType.JSON,
    [RequestHeader.CACHE_CONTROL]: PolicyType.NO_CACHE,
};

interface RequestParams {
  responseInterceptors?: any,
  requestInterceptors?: any,
};

interface HttpClientProps {
  baseURL?: string,
  timeout?: number,
  headers?: AxiosHeaders,
  paramsSerializerConfig?: ParamsSerializerOptions,
  tokenType?: string,
  params?: RequestParams
};

const getResponseInterceptors = (params: RequestParams = {}) => params?.responseInterceptors || responseInterceptors;
const getRequestInterceptors = (params: RequestParams = {}) => params?.requestInterceptors || handleRequestWithoutAuthHeaderInterception;

export const createHttpClient = ({
  baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || API.URL.BASE,
  headers = new AxiosHeaders(requestHeaders),
  paramsSerializerConfig,
  timeout = 15000,
  params = {},
  tokenType = 'accessToken',
}: HttpClientProps): AxiosInstance => {
    
  const client = axios.create({ baseURL, timeout, headers });
    const requestInterceptor = getRequestInterceptors(params);

    client.interceptors.request.use((config) => requestInterceptor({ ...config, tokenType }));
    client.interceptors.response.use(...getResponseInterceptors(params));
    if (paramsSerializerConfig) {
      client.defaults.paramsSerializer = paramsSerializerConfig;
    }
    return client;
};

