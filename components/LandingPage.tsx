import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import '../public/Styles/LandingPage.css';

interface Pokemon {
  name: string;
  sprite: string;
}

export default function LandingPage() {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [pokemonSearchText, setPokemonSearchText] = useState<string>('');
  const router = useRouter();

  async function FetchPokemon() {
    try {
      const response = await fetch('/api/HomepagePokemon', {
        method: 'Get',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const homepagePokemon: Pokemon[] = await response.json();
      setPokemonData(homepagePokemon);
    } catch (error) {
      alert('Having Trouble Loading this page. Please reload.');
    }
  }

  function handleSearchText(e: React.ChangeEvent<HTMLInputElement>) {
    setPokemonSearchText(e.target.value);
  }

  useEffect(() => {
    FetchPokemon();
  }, []);

  return (
    <div>
      <div className="pokedexInputBox">
        <input
          placeholder="find a specific pokemon"
          value={pokemonSearchText}
          onChange={handleSearchText}
        />
        <div
          className="searchIcon"
          onClick={() => router.push(`/Profile/${pokemonSearchText}`)}
        >
          <Icon width={25} height={25} icon="pixelarticons:search" />
        </div>
      </div>
      <div className="pokedexContainer">
        {pokemonData.map((pokemon) =>
          pokemon.name.match(pokemonSearchText.toLowerCase()) ? (
            <Link key={pokemon.name} href={`/Profile/${pokemon.name}`}>
              <div className="pokedexEntry">
                <div>
                  <img src={pokemon.sprite} alt="pokemon image" />
                  <div className="pokedexName">
                    {pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}
                  </div>
                </div>
              </div>
            </Link>
          ) : null,
        )}
      </div>
    </div>
  );
}
