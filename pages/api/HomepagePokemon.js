export default async function HomepagePokemon(req, res) {
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon-form/?limit=60';

  // Make a GET request to the API using the Fetch API
  await fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Extract the results from the response
      const { results } = data;

      const pokemonData = results.map((result) => {
        const { name, url } = result;
        const id = url
          .split('/')
          .filter((el) => el)
          .pop();
        const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        return { name, id, sprite, url };
      });

      if (pokemonData) {
        res.status(200).json(pokemonData);
      }
    });
}
