import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { ValidateEnv } from '@julr/vite-plugin-validate-env';
import { z } from 'zod';

const schema: Record<keyof ImportMetaEnvs, z.ZodType> = {
  VITE_ENV: z.string().min(1),
  VITE_API_BASE_URL: z.string().min(1),
  VITE_TERRA_BASE_URL: z.string().min(1),
  VITE_SENTINEL_BASE_URL: z.string().min(1),
  VITE_SENTINEL_DOMAIN: z.string().min(1),
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), ValidateEnv({ validator: 'standard', schema })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
