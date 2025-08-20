import './App.css';
import { Button } from './common/components/ui/button';

const App = () => {
  return (
    <div className="content">
      <h1 className="text-red-500">Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <Button variant='destructive'>Something</Button>
    </div>
  );
};

export default App;
