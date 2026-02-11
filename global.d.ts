/// <reference types="vite/client" />
declare global {
  /**
   * Query parameters for API requests
   * Used for pagination, sorting, and filtering
   */
  interface QueryParams {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
    [key: string]: unknown;
  }
}

export {};
