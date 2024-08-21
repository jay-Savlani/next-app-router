"use client";

import Link from "next/link";
import { useState } from "react";

export default function PokemonList({ pokemonData }) {
  const [search, setSearch] = useState("");

  const filteredPokemonData = pokemonData.filter((pokemon) =>
    pokemon.name.includes(search)
  );

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search"
        className="mb-8 w-full rounded bg-transparent bg-slate-700 text-center py-2 focus:bg-slate-700 focus:outline-none"
      />
      <ul className="grid grid-cols-5 gap-6">
        {filteredPokemonData.map((pokemon) => (
          <Link href={`/pokemon/${pokemon.name}`} key={pokemon.name}>
            <li className="border-2 rounded border-red-300 p-4 tracking-wide">
              {pokemon.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
