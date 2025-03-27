import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container text-center mt-5">
      <h1 className="text-primary">Welcome to the Book Store</h1>
      <p className="lead">This is a React app powered by Vite and styled with Bootstrap.</p>

      <div className="mt-4">
        <button className="btn btn-primary me-2" onClick={() => setCount((count) => count + 1)}>
          Increment Count
        </button>
        <button className="btn btn-danger" onClick={() => setCount(0)}>
          Reset Count
        </button>
      </div>

      <h2 className="mt-4">Count: {count}</h2>
    </div>
  );
}
