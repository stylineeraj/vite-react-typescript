import { useBoundStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, Outlet } from 'react-router-dom';

export function Dashboard() {
  const { user, logout } = useBoundStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className='container mx-auto p-8'>
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div>
              <p className='text-sm text-muted-foreground'>Name</p>
              <p className='text-lg font-medium'>{user.name || 'N/A'}</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Email</p>
              <p className='text-lg font-medium'>{user.email || 'N/A'}</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Age</p>
              <p className='text-lg font-medium'>{user.age || 'N/A'}</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Admin</p>
              <p className='text-lg font-medium'>{user.isAdmin ? 'Yes' : 'No'}</p>
            </div>
            <Button onClick={handleLogout} variant='destructive'>
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
      <Outlet />
    </div>
  );
}
