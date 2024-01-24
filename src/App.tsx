'use client'

import { FC, useEffect, useState } from 'react';
import { Pokemon } from './Pokemon';
import useSWRInfinite from 'swr/infinite';

import './style.css';

const fetcher = (url) => fetch(url).then((res) => res.json());

export const App:FC = ():JSX.Element => {
  const {data, size, setSize, error, isLoading} = useSWRInfinite((index) => `https://pokeapi.co/api/v2/pokemon?offset=${index*2*10}&limit=10`, fetcher, {initialSize: 1, revalidateFirstPage: false});
  const [pokemons, setPokemons] = useState<Array<any>>([]);

  useEffect(() => {
    if(data) {
      const allResults = data.flatMap((page) => page.results)
      setPokemons(allResults);
    }
  }, [data])

  if(error) return (<p>An error is occured.</p>);
  if (isLoading) return (<p>"Loading..."</p>);

  return (
    <main className='App'>
      <h1>Pokedex Page {size}</h1>
      <div>
          {pokemons.map((pokemon) => (
              <Pokemon key={pokemon.name} pokemon={pokemon} />
          ))}
      </div>
      <button onClick={() => setSize(size+1)}>
          Load more...
      </button>
    </main>
  );
};
