import { FC, ReactElement, useState } from 'react';
import { Pokemon } from './Pokemon';
import { useRequest } from './useRequest';
import useSWRInfinite from "swr/infinite";

import './style.css';

export const App:FC = ():JSX.Element => {
  const [count, setCount] = useState(0);

  const {data:result, mutate, size, setSize, isValidating, error, isLoading} = useSWRInfinite((index) => `https://pokeapi.co/api/v2/pokemon?page=${index+1}`);
  // const {data: result, error, isLoading} = useRequest('/pokemon')
  if(error) return (<p>An error is occured.</p>);
  if (isLoading) return (<p>"Loading..."</p>); 
  return (
    <main className='App'>
      <h1>Pokedex</h1>
      <div>
          {result.map((pokemon) => (
              <Pokemon key={pokemon.name} pokemon={pokemon} />
          ))}
      </div>
      <button onClick={() => setSize(1)}>
          Load more...
      </button>
    </main>
  );
};
