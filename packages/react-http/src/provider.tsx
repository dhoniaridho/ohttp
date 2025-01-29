import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import * as React from "react";
import { type ReactNode } from "react";

type HttpContextType = {
  baseURL?: string;
  axios: AxiosInstance;
};

type HttpProviderProps = {
  children: React.JSX.Element;
  baseURL?: string;
  client: QueryClient;
  beforeRequest?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig;
  onFulfill?: (response: AxiosResponse) => AxiosResponse;
  onReject?: (error: AxiosError) => AxiosError;
};

export const HttpContext = React.createContext<HttpContextType>({
  baseURL: "",
  axios: axios.create(),
});

export default function Provider({
  children,
  baseURL,
  client,
  beforeRequest,
  onFulfill,
  onReject,
}: HttpProviderProps) {
  const http = axios.create({
    baseURL: baseURL,
  });

  if (beforeRequest) {
    http.interceptors.request.use((config) => {
      return beforeRequest(config);
    });
  }

  if (onFulfill) {
    http.interceptors.response.use(onFulfill, onReject);
  }

  return (
    <HttpContext.Provider
      value={{
        baseURL: baseURL,
        axios: http,
      }}
    >
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </HttpContext.Provider>
  );
}
