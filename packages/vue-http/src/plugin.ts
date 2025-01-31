import { Plugin } from "vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export type HttpOptions = {
  beforeRequest?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig;
  onFulfill?: (response: AxiosResponse) => AxiosResponse;
  onReject?: (error: AxiosError) => AxiosError;
  baseURL?: string;
};

export const VueHttpPlugin: Plugin = {
  install(app, { beforeRequest, onFulfill, onReject, baseURL }: HttpOptions) {
    app.use(VueQueryPlugin);

    const http = axios.create({
      baseURL,
    });

    if (beforeRequest) {
      http.interceptors.request.use(beforeRequest);
    }
    if (onFulfill || onReject) {
      http.interceptors.response.use(onFulfill, onReject);
    }

    app.provide("http", http);
  },
};
