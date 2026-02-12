import { Login } from '@/pages/Login';
import { Dashboard } from '@/pages/Dashboard';
import { Profile } from '@/pages/Profile';

export interface RouteConfig {
  path: string;
  element?: React.ReactElement;
  protected?: boolean;
  children?: RouteConfig[];
  index?: boolean;
  redirect?: string;
}

/**
 * Route configuration
 *
 * Example of nested routes:
 * {
 *   path: '/admin',
 *   element: <AdminLayout />, // Should include <Outlet /> for nested routes
 *   protected: true,
 *   children: [
 *     { path: 'users', element: <Users /> },
 *     { path: 'settings', element: <Settings /> },
 *   ]
 * }
 */
export const routes: RouteConfig[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    // protected: true,
    children: [{ path: 'profile', element: <Profile /> }],
  },
  {
    path: '/profile',
    element: <Profile />,
    // protected: true,
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
];
