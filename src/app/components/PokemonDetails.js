// src/components/PokemonDetails.js
import React from "react";
import styles from "../styles/components/PokemonDetails.module.css";
import { Progress } from "@/components/ui/progress";

const PokemonDetails = ({ pokemon }) => {
  if (!pokemon) return <p>Loading...</p>;

  return (
    <div className={styles.pokemonDetails}>
      <h1 className="text-2xl font-bold mt-4 capitalize text-center">
        {pokemon.name}
      </h1>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-32 h-32 mx-auto"
      />

      <div className="mt-6 space-y-4 w-full px-4">
        {/* Height */}
        <div>
          <div className="flex items-center">
            <div className="w-1/3">
              <p className="text-lg mt-2 text-black	">
                <strong>Height:</strong>
                {pokemon.height / 10}m
              </p>
            </div>
          </div>
        </div>

        {/* Weight */}
        <div>
          <div className="flex items-center">
            <div className="w-1/3">
              <p className="text-black mt-2">
                <strong>Weight:</strong>
                {pokemon.weight / 10}kg
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div>
          <label className="block text-sm font-medium text-black-700 mb-1">
            Stats
          </label>
          {pokemon.stats.map((stat) => (
            <div key={stat.stat.name} className="flex items-center">
              <div className="w-1/3">
                <p className="text-sm">{stat.stat.name}</p>
              </div>
              <div className="w-2/3">
                <Progress
                  value={stat.base_stat}
                  max={100}
                  className="h-3 rounded-full bg-gray-200"
                >
                  <div
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: `${(stat.base_stat / 100) * 100}%` }}
                  />
                </Progress>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Base Experience */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Base Experience
        </label>
        <Progress
          value={pokemon.base_experience}
          max={100}
          className="h-3 rounded-full bg-gray-200"
        >
          <div
            className="h-full bg-red-500 rounded-full"
            style={{ width: `${(pokemon.base_experience / 100) * 100}%` }}
          />
        </Progress>
      </div>

      {/* Abilities */}
      <div className="mt-6 text-center">
        <p className="text-lg">
          <strong>Types:</strong>{" "}
          {pokemon.types.map((type) => type.type.name).join(", ")}
        </p>
        <p className="text-lg mt-2">
          <strong>Abilities:</strong>{" "}
          {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}
        </p>
      </div>
    </div>
  );
};

export default PokemonDetails;
