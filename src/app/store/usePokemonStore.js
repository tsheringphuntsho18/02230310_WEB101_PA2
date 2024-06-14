
import {create} from 'zustand';

const usePokemonStore = create((set) => ({
  caughtPokemon: JSON.parse(localStorage.getItem('caughtPokemon')) || [],

  catchPokemon: (pokemon) =>
    set((state) => {
      const updatedCaughtPokemon = [...state.caughtPokemon, pokemon];
      localStorage.setItem('caughtPokemon', JSON.stringify(updatedCaughtPokemon));
      return { caughtPokemon: updatedCaughtPokemon };
    }),

  releasePokemon: (name) =>
    set((state) => {
      const updatedCaughtPokemon = state.caughtPokemon.filter((p) => p.name !== name);
      localStorage.setItem('caughtPokemon', JSON.stringify(updatedCaughtPokemon));
      return { caughtPokemon: updatedCaughtPokemon };
    }),
}));

export default usePokemonStore;
