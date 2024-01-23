'use client'

import { FC, useEffect, useState } from 'react';
import { Pokemon } from './Pokemon';
import useSWRInfinite from 'swr/infinite';

import './style.css';

const fetcher = (url) => fetch(url).then((res) => res.json()).then((data) => data.results);

export const App:FC = ():JSX.Element => {
  const {data, size, setSize, error, isLoading} = useSWRInfinite((index) => `https://pokeapi.co/api/v2/pokemon?offset=${index*2*10}&limit=10`, fetcher, {initialSize: 1, revalidateFirstPage: false});
  const [pokemons, setPokemons] = useState([]);
  if(error) return (<p>An error is occured.</p>);
  if (isLoading) return (<p>"Loading..."</p>);

  useEffect(() => {
    setPokemons((prevPokemons) => [...prevPokemons, ...data[0]]);
  }, [data])

  return (
    <main className='App'>
      <h1>Pokedex Page {size}</h1>
      <div>
          {pokemons.map((pokemon) => (
              // <Pokemon key={pokemon.name} pokemon={pokemon} />
              <div className='Card' key={pokemon.name}>
                <span>{pokemon.name}</span>
                {/* <span className='Card--id'>#{pokemon.id}</span> */}
                {/* <img className='Card--image' src={data.sprites.front_default} alt={name} />
                <h1 className='Card--name'>{name}</h1>
                <span className='Card--details'>{data.types.map((poke) => poke.type.name)}</span> */}
            </div>
          ))}
      </div>
      <button onClick={() => setSize(size+1)}>
          Load more...
      </button>
    </main>
  );
};
