import { useState, useEffect, useCallback } from "react";
import { createHttpClient } from "../services";

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

interface APIServiceOptions<T> {
  url: string;
  method?: HttpMethod;
  data?: unknown;
  params?: Record<string, unknown>;
  immediate?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
}

export function useAPIService<T = unknown>() {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  const makeRequest = async (options: APIServiceOptions<T>) => {
    const {
      url,
      method = "get",
      data,
      params,
      onSuccess,
      onError,
    } = options;

    setLoading(true);
    setError(null);

    try {
      const client = createHttpClient({baseURL: url});
      const response = await client.request<T>({
        baseURL: url,
        method,
        data,
        params,
      });

      setData(response.data);
      if (onSuccess) onSuccess(response.data);
      return response.data;
    } catch (err) {
      setError(err);
      if (onError) onError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const callAPI = useCallback(makeRequest, []);

  return { data, error, loading, callAPI };
}

// Convenience hook for immediate API calls
export function useNetworkAPI<T = unknown>(options: APIServiceOptions<T>) {
  const { data, error, loading, callAPI } = useAPIService<T>();
  const { immediate = true } = options;

  useEffect(() => {
    if (immediate) {
      callAPI(options);
    }
  }, [callAPI, immediate, options.url]); // Only re-run if URL changes

  return { data, error, loading, refetch: () => callAPI(options) };
}
