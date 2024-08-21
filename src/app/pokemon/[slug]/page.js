import Image from "next/image";
import Expand from "@/app/components/Expand";

/* server component */

export default async function PokemonData({ params }) {
  /**
   * As this component does not contain any dynamic functions likes cookies(), etc.
   * Default fetch behaviour will be cache the data in data cache
   */
  const pokemon = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${params.slug}`
  ).then((res) => res.json());

  return (
    <div className="min-h-screen px-28">
      <div className="flex items-center">
        <h1 className="text-2xl uppercase py-4">{params.slug}</h1>

        <Image src={pokemon.sprites.front_default} width={200} height={200} />
      </div>

      <Expand title="Abilities">
        <div className="text-[20px]">
          <div className="grid grid-cols-2 py-2">
            <span>Count</span>
            <span>{pokemon.abilities.length}</span>
          </div>
          <div className="grid grid-cols-2 py-2">
            <span>Abilities</span>
            <ul className="grid grid-cols-4 gap-2">
              {pokemon.abilities.map((ability) => (
                <li key={ability.ability.name}>{ability.ability.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </Expand>

      <div className="grid grid-cols-2 py-2">
        <span>Base Experience</span>
        <span>{pokemon.base_experience}</span>
      </div>

      <Expand title="Moves">
        <div className="grid grid-cols-2 py-2">
          <span>Moves</span>
          <ul className="grid grid-cols-4 gap-2">
            {pokemon.moves.map((move) => (
              <li key={move.move.name}>{move.move.name}</li>
            ))}
          </ul>
        </div>
      </Expand>
    </div>
  );
}
