export default async function SearchForPokemon(req, res) {
  let pokemonName = req.url.split('/').pop();
  let pokemonData;

  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

  await fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Extract the results from the response

      pokemonData = data;
    });
  if (pokemonData) {
    res.status(200).json(pokemonData);
  }
}
