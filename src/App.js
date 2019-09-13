import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [planets, setPlanets] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://rbatsenko.azurewebsites.net/api/httpPlanets');
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
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {error && <p style={{color: "red"}}>{error}</p>}
        {loading && 'Loading...'}
        <ul style={{padding: 0, textAlign: 'left'}}>
          {planets.length > 0 && planets.map(planet => <li key={planet.name}>{planet.name} - {planet.terrain}</li>)}
        </ul>
      </header>
    </div>
  );
}

export default App;
