import React from 'react';
import useFetchPlanets from '../hooks/useFetchPlanets';

export default function PlanetsList({ apiUrl }) {
  const [{ planets, isLoading, isError }] = useFetchPlanets(apiUrl);

  if (isError) {
    return <p className="error">Something went wrong...</p>;
  }

  if (isLoading) {
    return <p className="loading">{'Loading...'}</p>;
  }

  return (
    <ul className="planets-list">
      {planets.length > 0 &&
        planets.map(planet => (
          <li key={planet.name}>
            {planet.name} - {planet.terrain}
          </li>
        ))}
    </ul>
  );
}
