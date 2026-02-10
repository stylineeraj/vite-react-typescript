import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { ValidateEnv } from '@julr/vite-plugin-validate-env';
import { z } from 'zod';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ValidateEnv({
      validator: 'standard',
      schema: {
        VITE_ENV: z.string().min(1),
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
