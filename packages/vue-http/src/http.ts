import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  type UseQueryOptions,
  type UseMutationOptions,
  useQuery,
  useMutation,
  UndefinedInitialQueryOptions,
} from "@tanstack/vue-query";
import { inject } from "vue";

type HttpContextType = {
  baseURL?: string;
  axios: AxiosInstance;
};

type Config<TData = any, TError = DefaultError> = {
  method?: "GET" | "HEAD" | "POST" | "OPTIONS" | "PUT" | "DELETE" | "PATCH";
  keys?: any[];
  searchParams?: Record<string, any>;
  vars?: Record<string, any>;
  httpOptions?: AxiosRequestConfig;
  queryOptions?: UseQueryOptions<TData, TError>;
};

type DefaultError = {
  message: string;
  validation: object;
};

/**
  * API GET Method request only.
  * @example
      const { data: items, isLoading, isError } = useHttp<number, string>('/', {
        keys: ['id']
        queryOptions: {
          onSuccess: function (data) {
            return
          },
          onError: function (data) {
            data
          },
        },
      })
  * @param url URL API
  * @param options HTTP Mutation Options
  */
export function useHttp<TData = any, TError = any>(
  url: string,
  options?: Config<TData, TError>
) {
  const config = inject<HttpContextType>("HttpContext") as HttpContextType;

  const defaultOptions: UndefinedInitialQueryOptions<TData, TError> = {
    queryKey: [url, options],
    queryFn: async () => {
      try {
        const defaultConfig = {
          url: replaceDynamicParams(url, options?.vars ?? {}),
        };

        if (options?.httpOptions) {
          Object.assign(defaultConfig, options.httpOptions);
        }

        if (options?.method) {
          Object.assign(defaultConfig, { method: options.method });
        } else {
          Object.assign(defaultConfig, { method: "GET" });
        }

        if (options?.searchParams) {
          Object.assign(defaultConfig, { params: options.searchParams });
        }
        const { data } = await config.axios.request<TData>(defaultConfig);
        return data ?? null;
      } catch (e: any) {
        Promise.reject(e?.response ?? e);
        return e;
      }
    },
  };

  if (options?.queryOptions) {
    Object.assign(defaultOptions, options.queryOptions);
  }
  return useQuery(defaultOptions);
}

type HttpMutationOptions<
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
  TContext = unknown,
> = {
  method: "GET" | "HEAD" | "POST" | "OPTIONS" | "PUT" | "DELETE" | "PATCH";
  httpOptions?: AxiosRequestConfig;
  queryOptions?: UseMutationOptions<TData, TError, TVariables, TContext>;
};

function replaceDynamicParams(
  urlTemplate: string,
  params: Record<string, string | any>
) {
  return urlTemplate.replace(/{(\w+)}/g, (_, key) => {
    if (params[key] !== undefined) {
      return params[key];
    }
    throw new Error(`Missing parameter: ${key}`);
  });
}

/**
     * Update data to the server.
     * @example
      const {mutate, isFetching, isError, error} =  useHttpMutation<TData, TError>('todos/:id', {
        method: 'POST',
        httpOptions: { // axios options
          timeout: 30000,
        },
        queryOptions: { // vue-query options
          onSuccess: function (data) {
            console.log(data);
          },
          onError: function (data) {
            console.log(data);
          },
        },
        })
        const onSubmitForm = (data) => {
          mutate(data)
        }
     * @param url URL API
     * @param options HTTP Mutation Options
     */
export function useHttpMutation<
  TVariables = unknown,
  TData = unknown,
  TError = AxiosResponse<DefaultError>,
>(url: string, options: HttpMutationOptions<TData, TError>) {
  const config = inject<HttpContextType>("HttpContext") as HttpContextType;

  return useMutation<
    TData,
    TError,
    {
      body?: FormData | any;
      headers?: Record<string, string>;
      searchParam?: Record<string, string>;
      vars?: Record<string, string>;
    }
  >({
    mutationFn: (value) => {
      return new Promise<TData>((resolve, reject) => {
        const cfg = {
          url: replaceDynamicParams(url, value.vars ?? {}),
          method: options.method,
          ...options.httpOptions,
          params: value.searchParam,
        };

        const val = value as {
          headers?: Record<string, string>;
          searchParams?: Record<string, string>;
          body?: FormData | TVariables;
        };

        if (val.headers) {
          Object.assign(cfg, { headers: val.headers });
        }

        if (val.searchParams) {
          Object.assign(cfg, { params: val.searchParams });
        }

        if (val.body) {
          Object.assign(cfg, { data: val.body });
        }

        return config.axios
          .request<TData>(cfg)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error: AxiosError<TError>) => {
            reject(error.response ?? error.message);
          });
      });
    },
    ...options.queryOptions,
  });
}
