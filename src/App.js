import React, { useState, useEffect } from 'react';
import { API_URL } from './config';
import logo from './logo.svg';
import './App.css';

function App() {
  const [planets, setPlanets] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [waking, setWaking] = useState(true);

  useEffect(() => {
    const fetchPlanets = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        const { data } = await response.json();
        setError(null);
        setPlanets(data);
        setLoading(false);
      } catch (error) {
        if (error.message === 'Unexpected end of JSON input') {
          setError('Invalid API endpoint :/')
        } else {
          setError(error.message);
        }
        setLoading(false);
      }
    }
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          body: JSON.stringify({ wakeUp: true }),
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const json = await response.json();
        try {
          const { wakingUp } = json.data;
          if (wakingUp) {
            setWaking(false);
            fetchPlanets();
          }
        } catch (err) {
          setError(err.message);
        }
      } catch(error) {
        setError(error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {error && <p style={{color: "red"}}>{error}</p>}
        {loading && 'Loading...'}
        {waking && 'Waking server up...'}
        <ul style={{padding: 0, textAlign: 'left'}}>
          {planets.length > 0 && planets.map(planet => <li key={planet.name}>{planet.name} - {planet.terrain}</li>)}
        </ul>
      </header>
    </div>
  );
}

export default App;
