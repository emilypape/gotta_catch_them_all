import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PokemonProfile from '../../components/PokemonProfile';

export default function SpecificRecipeRoute() {
  const [pokemonName, setPokemonName] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { name } = router.query;
      setPokemonName(name);
    }
  });

  return (
    pokemonName && (
      <>
        <PokemonProfile name={pokemonName} />
      </>
    )
  );
}
