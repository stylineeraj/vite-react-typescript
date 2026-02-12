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

  /**
   * Once you add a new environment variable, you need to add it to this interface. Also update the schema in vite.config.ts.
   */
  interface ImportMetaEnvs {
    readonly VITE_ENV: string;
    readonly VITE_API_BASE_URL: string;
    readonly VITE_TERRA_BASE_URL: string;
    readonly VITE_SENTINEL_BASE_URL: string;
    readonly VITE_SENTINEL_DOMAIN: string;
  }
}

export {};
