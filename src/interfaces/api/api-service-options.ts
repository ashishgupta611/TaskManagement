export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

export interface APIServiceOptions<T> {
  url: string;
  method?: HttpMethod;
  data?: unknown;
  params?: Record<string, unknown>;
  immediate?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
};