// src/hooks/useFetchPokemon.js
import { useState } from 'react';

const useFetchPokemon = () => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPokemon = async (name) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      if (!response.ok) throw new Error('Pokemon not found');
      const data = await response.json();
      setPokemon(data);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { pokemon, error, loading, fetchPokemon };
};

export default useFetchPokemon;
