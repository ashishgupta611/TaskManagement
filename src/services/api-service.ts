import axios, {
  AxiosInstance,
  AxiosHeaders,
  ParamsSerializerOptions,
  AxiosResponse,
  AxiosError,
} from "axios";
import { AcceptType, ContentType, PolicyType, RequestHeader } from "../enums";
import { API } from "../constants/endpoints";
import { responseInterceptors } from "../interceptors/response-interceptor";
import { handleRequestWithoutAuthHeaderInterception } from "../interceptors/request-interceptor";
import { APIServiceOptions } from "../interfaces";

axios.defaults.headers.common = {
  "Content-Type": "application/json",
  "Cache-Control": "no-cache",
};

const requestHeaders = {
  [RequestHeader.ACCEPT]: AcceptType.JSON,
  [RequestHeader.CONTENT_TYPE]: ContentType.JSON,
  [RequestHeader.CACHE_CONTROL]: PolicyType.NO_CACHE,
};

interface RequestParams {
  responseInterceptors?: any;
  requestInterceptors?: any;
}

interface HttpClientProps {
  baseURL?: string;
  timeout?: number;
  headers?: AxiosHeaders;
  paramsSerializerConfig?: ParamsSerializerOptions;
  tokenType?: "accessToken" | "refreshToken" | string;
  params?: RequestParams;
}

const getResponseInterceptors = (params: RequestParams = {}) =>
  params?.responseInterceptors || responseInterceptors;
const getRequestInterceptors = (params: RequestParams = {}) =>
  params?.requestInterceptors || handleRequestWithoutAuthHeaderInterception;

export const createHttpClient = ({
  baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || API.URL.BASE,
  headers = new AxiosHeaders(requestHeaders),
  paramsSerializerConfig,
  timeout = 15000,
  params = {},
  tokenType = "accessToken",
}: HttpClientProps): AxiosInstance => {
  const client = axios.create({ baseURL, timeout, headers });
  const requestInterceptor = getRequestInterceptors(params);

  client.interceptors.request.use((config) =>
    requestInterceptor({ ...config, tokenType })
  );
  client.interceptors.response.use(...getResponseInterceptors(params));
  if (paramsSerializerConfig) {
    client.defaults.paramsSerializer = paramsSerializerConfig;
  }
  return client;
};

export const makeRequest = async <T>(options: APIServiceOptions<T>): Promise<{ res: AxiosResponse<T> | null; err: AxiosError<T> | null }> => {
  
  const { url, method = "get", data, params } = options;
  try {
    const client = createHttpClient({ baseURL: url });
    const response = await client.request<T>({
      baseURL: url,
      data,
      params,
      method: method,
    });
    return { res: response, err: null };
  } catch (err) {
    return { res: null, err: err as AxiosError<T> };
  }
};
