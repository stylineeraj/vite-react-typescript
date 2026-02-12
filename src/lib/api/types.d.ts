import type { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';

export type ApiRoute =
  // Auth routes
  | '/v1/login/user'
  | '/auth/login'
  | '/auth/me'
  // User routes
  | '/users'
  | `/users/${string}`;

export type TypedAxiosInstance = {
  get<T = any, R = AxiosResponse<T>>(
    url: ApiRoute,
    config?: AxiosRequestConfig
  ): Promise<R>;
  post<T = any, R = AxiosResponse<T>>(
    url: ApiRoute,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R>;
  put<T = any, R = AxiosResponse<T>>(
    url: ApiRoute,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R>;
  patch<T = any, R = AxiosResponse<T>>(
    url: ApiRoute,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R>;
  delete<T = any, R = AxiosResponse<T>>(
    url: ApiRoute,
    config?: AxiosRequestConfig
  ): Promise<R>;
  request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R>;
  head<T = any, R = AxiosResponse<T>>(
    url: ApiRoute,
    config?: AxiosRequestConfig
  ): Promise<R>;
  options<T = any, R = AxiosResponse<T>>(
    url: ApiRoute,
    config?: AxiosRequestConfig
  ): Promise<R>;
  interceptors: AxiosInstance['interceptors'];
  defaults: AxiosInstance['defaults'];
  getUri(config?: AxiosRequestConfig): string;
};

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
