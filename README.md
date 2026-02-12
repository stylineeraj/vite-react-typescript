# Seller Central Ops UI

A modern React [Seller Central Ops UI (Terra UI migration)] application built with TypeScript, Vite, and shadcn/ui. This project provides a solid foundation for building scalable web applications with authentication, state management, and API integration.

## 🚀 Tech Stack

### Core Technologies

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite 7** - Build tool and dev server
- **React Router 7** - Client-side routing

### State Management & Data Fetching

- **Zustand** - Lightweight state management
- **Immer** - Immutable state updates
- **TanStack Query (React Query)** - Server state management and data fetching

### UI & Styling

- **shadcn/ui** - High-quality component library
- **Tailwind CSS v4** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Radix UI** - Accessible component primitives

### HTTP & API

- **Axios** - HTTP client with interceptors
- **Zod** - Schema validation

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Simple Git Hooks** - Pre-commit formatting
- **TypeScript ESLint** - TypeScript-specific linting

## 📋 Prerequisites

- **Node.js** >= 22
- **npm** >= 10 and **pnpm** >= 10 (recommended)

## 🏃 Getting Started

### 1. Install Dependencies

```bash
pnpm install (recommended)
# or
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_ENV=development
VITE_API_BASE_URL=your_api_base_url
VITE_TERRA_BASE_URL=your_terra_base_url
VITE_SENTINEL_BASE_URL=your_sentinel_base_url
VITE_SENTINEL_DOMAIN=your_sentinel_domain
```

> **Note:** The application validates these environment variables at build time. Make sure all required variables are set.

### 3. Run Development Server

```bash
pnpm qa/dev
# or
npm run qa/dev
```

The application will be available at `http://localhost:5173` (or the port shown in the terminal).

### 4. Build for Production

```bash
pnpm build (recommended)
# or
npm run build
```

### 5. Preview Production Build

```bash
pnpm preview (recommended)
# or
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── ui/             # shadcn/ui components
│   └── ProtectedRoute.tsx
├── hooks/              # Custom React hooks
│   └── api/           # React Query hooks for API calls
├── lib/               # Library configurations
│   ├── api/          # Axios instance, query client
│   └── common/       # Common utilities
├── pages/            # Page components
├── routes/           # Route configuration
├── store/            # Zustand store
│   └── slices/      # Store slices (modular state)
├── utils/            # Utility functions
└── App.tsx           # Root component
```

## 🛠️ How to Add New Code

### Adding a New Route

1. Create a page component in `src/pages/`:

```tsx
// src/pages/NewPage.tsx
export function NewPage() {
  return <div>New Page Content</div>;
}
```

2. Add the route to `src/routes/index.tsx`:

```tsx
import { NewPage } from '@/pages/NewPage';

export const routes: RouteConfig[] = [
  // ... existing routes
  {
    path: '/new-page',
    element: <NewPage />,
    protected: true, // Optional: requires authentication
  },
];
```

**Route Options:**

- `path` - URL path
- `element` - React component to render
- `protected` - If `true`, route requires authentication
- `children` - Nested routes (parent route should include `<Outlet />`)
- `redirect` - Redirect to another path

### Adding a New Store Slice

1. Create a slice file in `src/store/slices/`:

```tsx
// src/store/slices/exampleSlice.ts
import type { StateCreator } from 'zustand';
import type { TStoreState } from '../types';

export interface ExampleState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const createExampleSlice: StateCreator<
  TStoreState,
  [['zustand/immer', never]],
  [],
  ExampleState
> = (set) => ({
  count: 0,
  increment: () =>
    set((state) => {
      state.example.count += 1;
    }),
  decrement: () =>
    set((state) => {
      state.example.count -= 1;
    }),
});
```

2. Add the slice type to `src/store/types.d.ts`:

```tsx
import type { ExampleState } from './slices/exampleSlice';

export interface TStoreState {
  // ... existing slices
  example: ExampleState;
}
```

3. Add the slice to `src/store/index.ts`:

```tsx
import { createExampleSlice } from './slices/exampleSlice';

export const useBoundStore = create<TStoreState>()(
  immer((...a) => ({
    // ... existing slices
    ...createExampleSlice(...a),
  }))
);
```

4. Use the store in components:

```tsx
import { useBoundStore } from '@/store';

function MyComponent() {
  const { count, increment } = useBoundStore((state) => state.example);
  return <button onClick={increment}>Count: {count}</button>;
}
```

### Adding a New API Hook

1. Create a hook directory in `src/hooks/api/`:

```
src/hooks/api/useExample/
├── types.d.ts
└── useExample.ts
```

2. Define types in `types.d.ts`:

```tsx
export interface ExampleDto {
  name: string;
  value: number;
}

export interface ExampleResponse {
  id: number;
  name: string;
  value: number;
}
```

3. Create the hook in `useExample.ts`:

```tsx
import { useQuery, useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/api/axios';
import type { ExampleDto, ExampleResponse } from './types';

// Query hook (GET)
export function useExample(id: number) {
  return useQuery({
    queryKey: ['example', id],
    queryFn: async () => {
      const response = await axiosInstance.get<ExampleResponse>(`/example/${id}`);
      return response.data;
    },
  });
}

// Mutation hook (POST/PUT/DELETE)
export function useCreateExample() {
  return useMutation({
    mutationFn: async (data: ExampleDto) => {
      const response = await axiosInstance.post<ExampleResponse>('/example', data);
      return response.data;
    },
  });
}
```

4. Use the hook in components:

```tsx
import { useExample, useCreateExample } from '@/hooks/api/useExample/useExample';

function MyComponent() {
  const { data, isLoading } = useExample(1);
  const createMutation = useCreateExample();

  const handleCreate = () => {
    createMutation.mutate({ name: 'Test', value: 100 });
  };

  if (isLoading) return <div>Loading...</div>;
  return <div>{data?.name}</div>;
}
```

### Adding a New UI Component

1. Use shadcn/ui CLI to add components:

```bash
> npx shadcn@latest add button
> npx shadcn@latest add card
```

2. Or create custom components in `src/components/`:

```tsx
// src/components/MyComponent.tsx
import { Button } from '@/components/ui/button';

export function MyComponent() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
```

### Using the API Client

The Axios instance is pre-configured with:

- Base URL from environment variables
- Automatic token injection from the store
- Global error handling (401 redirects to login)

```tsx
import { axiosInstance } from '@/lib/api/axios';

// GET request
const response = await axiosInstance.get('/api/users');

// POST request
const response = await axiosInstance.post('/api/users', { name: 'John' });
```

## 🎨 Styling

- **Tailwind CSS** is configured with the `@` alias for imports
- Use the `tw` utility function for conditional classes:

```tsx
import { tw } from '@/utils/tw';

<div className={tw('base-class', condition && 'conditional-class')} />;
```

- shadcn/ui components are styled with Tailwind and CSS variables
- Customize theme in `src/index.css`

## 🔧 Available Scripts

- `pnpm dev` - Start development server
- `pnpm qa` - Start development server in QA mode
- `pnpm build` - Build for production
- `pnpm build:qa` - Build for QA environment
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm prettify` - Format code with Prettier
- `pnpm prettify-check` - Check code formatting

## 🔐 Authentication

The app includes:

- **Protected routes** - Routes marked with `protected: true` require authentication
- **Token management** - Tokens are stored in Zustand store and localStorage
- **Auto token injection** - Axios automatically adds the Bearer token to requests
- **Auto logout** - 401 responses automatically log out the user

## 📝 Code Quality

- **Pre-commit hooks** - Automatically format code before commits
- **ESLint** - Linting rules for code quality
- **Prettier** - Consistent code formatting
- **TypeScript** - Type safety throughout the application

## 🗂️ Path Aliases

The project uses path aliases for cleaner imports:

- `@/` - Points to `src/`
- `@/components` - UI components
- `@/hooks` - Custom hooks
- `@/lib` - Library configurations
- `@/utils` - Utility functions

Example:

```tsx
import { useBoundStore } from '@/store';
import { Button } from '@/components/ui/button';
```

## 🤝 Contributing

1. Create a new branch for your feature
2. Make your changes
3. Code will be auto-formatted on commit
4. Ensure all linting passes: `pnpm lint`
5. Submit a pull request

---

**Happy coding! 🎉**
