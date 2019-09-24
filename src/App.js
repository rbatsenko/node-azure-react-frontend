import React, { useState, useEffect } from 'react';
import { API_URL } from './config';
import logo from './logo.svg';
import './App.css';
import PlanetsList from './components/PlanetsList';

function App() {
  const [error, setError] = useState(null);
  const [waking, setWaking] = useState(true);

  useEffect(() => {
    const wakeUpServer = async () => {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          body: JSON.stringify({ wakeUp: true }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json();
        try {
          const { wakingUp } = json.data;
          if (wakingUp) {
            setWaking(false);
          }
        } catch (err) {
          setError(err.message);
          setWaking(false);
        }
      } catch (error) {
        setError(error.message);
        setWaking(false);
      }
    };

    wakeUpServer();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {error && <p className="error">{error}</p>}
        {waking ? (
          <p className="waking-up">{'Waking server up...'}</p>
        ) : (
          <PlanetsList url={API_URL} />
        )}
      </header>
    </div>
  );
}

export default App;
