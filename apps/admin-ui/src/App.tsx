import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

type pingResponse = {
  data?: { ping?: string };
  errors?: Array<{ message: string }>;
};

function App() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePingClick(): Promise<void> {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ query: '{ping}' }),
      });

      const json: pingResponse = await res.json();

      if (json.errors && json.errors.length > 0) {
        setError(json.errors[0].message);
        setResult(null);
        return;
      }
      const pong = json.data?.ping ?? null;
      setResult(pong);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'unknown error');
      setResult(null);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <h2>Habit Tracker</h2>
      <button onClick={handlePingClick} disabled={loading}>
        {loading ? 'Pinging...' : 'Ping API'}
      </button>
      {result && <p>API says : {result}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}
export default App;
