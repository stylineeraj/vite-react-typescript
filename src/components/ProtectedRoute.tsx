// In ProtectedRoute.tsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useBoundStore } from '@/store';
import { useShallow } from 'zustand/react/shallow';
import { useAuthMe } from '@/hooks/api/useAuth/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, setUser } = useBoundStore(
    useShallow((state) => ({ user: state.user, setUser: state.setUser }))
  );
  const [isInit, setIsInit] = useState(!user.token);
  const authMeMutation = useAuthMe();

  useEffect(() => {
    if (!user.token && !isInit) {
      const storedUser = localStorage.getItem('user');

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser({ ...parsedUser });
          setIsInit(false);
          return;
        } catch {}
      }

      setIsInit(true);
      authMeMutation.mutate(undefined, {
        onSettled: () => {
          setIsInit(false);
        },
      });
    }
  }, [user.token, isInit, authMeMutation]);

  if (isInit) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-muted-foreground'>Loading...</div>
      </div>
    );
  }

  if (!user.token) {
    return <Navigate to='/login' replace />;
  }

  return <>{children}</>;
}
