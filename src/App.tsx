import { FC, ReactElement } from 'react';
import { Pokemon } from './Pokemon';
import { useRequest } from './useRequest';

import './style.css';

export const App:FC = ():JSX.Element => {
  const {data: result, error, isLoading} = useRequest('/pokemon')
  if(error) return (<p>An error is occured.</p>);
  if (isLoading) return (<p>"Loading..."</p>); 
  return (
    <main className='App'>
      <h1>Pokedex</h1>
      <div>
          {result.results.map((pokemon) => (
              <Pokemon key={pokemon.name} pokemon={pokemon} />
          ))}
      </div>
    </main>
  );
};
