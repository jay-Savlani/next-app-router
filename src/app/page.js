/**
 * As this component has all data cached in Data cache and there are no dynamic functions
 * such as cookies(), calcuations based on URL params, etc, this page will be
 * statically rendered at build time
 */

import PokemonList from "./components/PokemonList";

export default async function Home() {
  /**
   * Unless this component uses any dynamic function such as cookies, headers, etc, data will be cached in Data Cache
   * https://nextjs.org/docs/app/building-your-application/caching#data-cache
   * We can use options like force-cache or no-store to alter the default fetch behaviour.
   *
   * We can use route segment config to apply a particular fetch behaviour to all fetch requests in a page instead of
   * manually providing the option for each fetch
   *
   * As the pokemon data is static, I am opting for a force-cache option (Optional - covert this to a statically rendered page)
   * Now even if this server component contains any dynamic functions such as cookies() , this data will still be cached in Data Cache
   */
  const pokemonData = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0",
    { cache: "force-cache" }
  ).then((res) => {
    return res.json();
  });

  const sortedPokemonData = pokemonData.results.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 0;
    return 0;
  });

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <PokemonList pokemonData={sortedPokemonData} />
    </main>
  );
}
