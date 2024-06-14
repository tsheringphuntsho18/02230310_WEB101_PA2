// "use client";

// import React, { useState, useEffect } from "react";
// import SearchBar from "./components/SearchBar";
// import PokemonCard from "./components/PokemonCard";
// import PokemonDetails from "./components/PokemonDetails";
// import useFetchPokemon from "./hooks/useFetchPokemon";
// import usePokemonStore from "./store/usePokemonStore";
// import Link from "next/link";

// const Home = () => {
//   const [allPokemon, setAllPokemon] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedPokemon, setSelectedPokemon] = useState(null);
//   const { fetchPokemon } = useFetchPokemon();
//   const { catchPokemon } = usePokemonStore();

//   const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=";

//   useEffect(() => {
//     loadPokemon(currentPage);
//   }, [currentPage]);

//   const loadPokemon = async (page) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(`${POKEMON_API_URL}${(page - 1) * 20}`);
//       const data = await response.json();
//       setAllPokemon((prev) => [...prev, ...data.results]);
//     } catch (error) {
//       setError("Failed to load Pokémon. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = async (name) => {
//     const pokemon = await fetchPokemon(name);
//     if (pokemon) {
//       setSelectedPokemon(pokemon);
//     } else {
//       alert("Pokémon not found");
//     }
//   };

//   const handleCardClick = (pokemonDetails) => {
//     setSelectedPokemon(pokemonDetails); // Set the selected Pokémon for details view
//   };

//   const handleCatch = () => {
//     if (selectedPokemon) {
//       catchPokemon(selectedPokemon);
//       setSelectedPokemon(null);
//     }
//   };

//   const handleBackToList = () => {
//     setSelectedPokemon(null); // Clear the selected Pokémon to return to the list view
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10">
//       <div className="sticky top-0 z-50 w-full bg-gray-100 pt-2 pb-4 mb-4 shadow">
//         <h1 className="text-4xl font-bold mb-8 text-black font-serif text-center">
//           Pokémon
//         </h1>
//         <div className="flex justify-center">
//           <SearchBar onSearch={handleSearch} />
//         </div>
//         <div className="flex justify-center mt-4">
//           <Link href="/caught" className="text-blue-500 hover:underline">
//             View My Caught Pokémon
//           </Link>
//         </div>
//       </div>

//       {selectedPokemon ? (
//         <div className="flex flex-col items-center">
//           <PokemonDetails pokemon={selectedPokemon} />
//           <button
//             onClick={handleCatch}
//             className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
//           >
//             Catch
//           </button>
//           <button
//             onClick={handleBackToList}
//             className="mt-2 bg-gray-500 text-white py-2 px-4 rounded"
//           >
//             Back to List
//           </button>
//         </div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {allPokemon.map((pokemon) => (
//               <PokemonCard
//                 key={pokemon.name}
//                 pokemon={pokemon}
//                 onClick={handleCardClick} // Handle the card click to show details
//               />
//             ))}
//           </div>
//           {loading && <p className="text-xl text-blue-500">Loading...</p>}
//           {error && <p className="text-xl text-red-500">{error}</p>}
//           <button
//             onClick={() => setCurrentPage((prev) => prev + 1)}
//             className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
//           >
//             Load More
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default Home;

"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import PokemonCard from "./components/PokemonCard";
import PokemonDetails from "./components/PokemonDetails";
import useFetchPokemon from "./hooks/useFetchPokemon";
import usePokemonStore from "./store/usePokemonStore";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import Background from "./components/Background"; // Import the Background component

const Home = () => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const { fetchPokemon } = useFetchPokemon();
  const { catchPokemon } = usePokemonStore();

  const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon?limit=40&offset=";

  useEffect(() => {
    loadPokemon(currentPage);
  }, [currentPage]);

  const loadPokemon = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${POKEMON_API_URL}${(page - 1) * 20}`);
      const data = await response.json();
      setAllPokemon(data.results);
      setTotalPages(Math.ceil(data.count / 18)); // Assuming `data.count` is the total number of Pokémon available
    } catch (error) {
      setError("Failed to load Pokémon. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (name) => {
    const pokemon = await fetchPokemon(name);
    if (pokemon) {
      setSelectedPokemon(pokemon);
    } else {
      alert("Pokémon not found");
    }
  };

  const handleCardClick = (pokemonDetails) => {
    setSelectedPokemon(pokemonDetails); // Set the selected Pokémon for details view
  };

  const handleCatch = () => {
    if (selectedPokemon) {
      catchPokemon(selectedPokemon);
      setSelectedPokemon(null);
    }
  };

  const handleBackToList = () => {
    setSelectedPokemon(null); // Clear the selected Pokémon to return to the list view
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
            />
          </PaginationItem>
          {pageNumbers.map((number) =>
            number === 1 ||
            number === totalPages ||
            (number >= currentPage - 2 && number <= currentPage + 2) ? (
              <PaginationItem key={number}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(number);
                  }}
                  className={number === currentPage ? "active" : ""}
                >
                  {number}
                </PaginationLink>
              </PaginationItem>
            ) : number === currentPage - 3 || number === currentPage + 3 ? (
              <PaginationItem key={number}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : null
          )}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10  bg-teal-600	">
      <Background /> {/* Add the Background component */}
      <div className="relative z-10 w-full bg-gray-100 pt-4 pb-4	mb-10 shadow bg-rose-700		">
        <div className="flex justify-between items-center px-20">
          {" "}
          {/* Flex container for alignment */}
          <Button
            onClick={handleBackToList}
            className="text-4xl font-bold text-white font-serif"
          >
            Pokedex
          </Button>
          <SearchBar onSearch={handleSearch} />
          <Button className="text-gray-50">
            <Link
              href="/caught"
              className="text-blue-500 hover:underline text-gray-50"
            >
              Caught Pokemon
            </Link>
          </Button>
        </div>
      </div>
      {selectedPokemon ? (
        <div className="flex flex-col items-center relative z-10">
          <PokemonDetails pokemon={selectedPokemon} />
          <Button
            onClick={handleCatch}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Catch
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-10 gap-4 relative z-10">
            {allPokemon.map((pokemon) => (
              <PokemonCard
                key={pokemon.name}
                pokemon={pokemon}
                onClick={handleCardClick} // Handle the card click to show details
              />
            ))}
          </div>
          {loading && <p className="text-xl text-blue-500">Loading...</p>}
          {error && <p className="text-xl text-red-500">{error}</p>}
          <div className="mt-4 relative z-10">{renderPagination()}</div>
        </>
      )}
    </div>
  );
};

export default Home;
