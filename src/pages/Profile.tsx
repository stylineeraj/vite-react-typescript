import { useBoundStore } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Profile() {
  const { user } = useBoundStore();

  return (
    <div className='container mx-auto p-8'>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
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
              <p className='text-sm text-muted-foreground'>Role</p>
              <p className='text-lg font-medium'>
                {user.isAdmin ? 'Administrator' : 'User'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
