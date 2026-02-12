import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { routes } from './index';
import type { RouteConfig } from './index';
import { ProtectedRoute } from '@/components/ProtectedRoute';

function renderRouteElement(route: RouteConfig): React.ReactElement | undefined {
  if (route.redirect) return <Navigate to={route.redirect} replace />;

  if (!route.element && !route.children) return undefined;

  // If route has children, use Outlet for nested routes
  if (route.children?.length) {
    const element = route.element ?? <Outlet />;
    return route.protected ? <ProtectedRoute>{element}</ProtectedRoute> : element;
  }

  return route.protected ? (
    <ProtectedRoute>{route.element}</ProtectedRoute>
  ) : (
    route.element
  );
}

function renderRoutes(routesConfig: RouteConfig[]): React.ReactElement[] {
  return routesConfig.map((route) => {
    const element = renderRouteElement(route);

    if (route.children?.length) {
      return (
        <Route key={route.path} path={route.path} element={element}>
          {renderRoutes(route.children)}
          {route.index && (
            <Route
              index
              element={
                route.redirect ? <Navigate to={route.redirect} replace /> : element
              }
            />
          )}
        </Route>
      );
    }

    return (
      <Route key={route.path} path={route.path} index={route.index} element={element} />
    );
  });
}

export function AppRoutes() {
  return <Routes>{renderRoutes(routes)}</Routes>;
}
