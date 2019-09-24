import { useState, useEffect } from 'react';

const useFetchPlanets = (initialUrl, initialData = []) => {
  const [planets, setPlanets] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchPlanets = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const { data } = await response.json();
        setPlanets(data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchPlanets();
  }, [url]);

  return [{ planets, isLoading, isError }, setUrl];
};

export default useFetchPlanets;
