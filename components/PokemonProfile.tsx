import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import '../public/Styles/PokemonProfilePage.css';

interface PokemonProfile {
  name: string;
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

interface PokemonProfileProps {
  name: string;
}

export default function PokemonProfile({ name }: PokemonProfileProps) {
  const [pokemonProfile, setPokemonProfile] = useState<PokemonProfile | null>(
    null,
  );
  const router = useRouter();

  async function FetchPokemonProfile() {
    try {
      const response = await fetch(`/api/SearchForPokemon/${name}`, {
        method: 'Get',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const pokemon: PokemonProfile = await response.json();
      setPokemonProfile(pokemon);
    } catch (error) {
      alert('There is no pokemon with this name. Return Home and try again!');
      router.push('/'); // Redirect to the home page if there's an error
    }
  }

  useEffect(() => {
    FetchPokemonProfile();
  }, []);

  return (
    <div className="pokemonProfilePage">
      <div className="pokemonName">
        {name[0].toUpperCase() + name.substring(1)}
      </div>
      <div className="pokemonCardContainer">
        <img
          className="pokemonImage"
          alt="pokemon image"
          width={400}
          height={400}
          src={pokemonProfile?.sprites?.front_default}
        />
        <div className="pokemonAttributesContainer">
          <div className="pokemonAttribute">
            Height: {pokemonProfile?.height}ft
          </div>
          <div className="pokemonAttribute">
            Weight: {pokemonProfile?.weight}lbs
          </div>
          <div className="abilityListContainer">
            <div className="abilitiesHeader">Abilities:</div>
            <div className="abilityListItem">
              {pokemonProfile?.abilities
                ?.map(
                  (ability) =>
                    ability.ability.name[0].toUpperCase() +
                    ability.ability.name.substring(1),
                )
                .join(', ')}
            </div>
          </div>
        </div>
      </div>
      <Link href="/">
        <button className="homeButton">Home</button>
      </Link>
    </div>
  );
}
