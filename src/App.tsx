import { Button } from './components/ui/button';
import { useBoundStore } from './store';

export function App() {
  const { user, count, increment, decrement, reset, incrementBy } = useBoundStore();
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='font-medium'>Hello World</div>
      <div className='font-medium'>User: {user.name}</div>
      <div className='font-medium'>Count: {count}</div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
      <button onClick={() => incrementBy(10)}>Increment By 10</button>

      <div className='flex min-h-svh flex-col items-center justify-center'>
        <Button>Click me</Button>
      </div>
    </div>
  );
}

export default App;
