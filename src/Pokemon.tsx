import * as React from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export const Pokemon = ({pokemon}) => {
    const {name} = pokemon;

    const url = 'https://pokeapi.co/api/v2/pokemon/' + name;

    const {data, error, isLoading} = useSWR(url, fetcher);

    console.log(data);

    if(error) return <h1>Something went wrong!</h1>;
    if(isLoading) return <h1>Loading...</h1>

    return (
        <div className='Card'>
            <span className='Card--id'>#{data.id}</span>
            <img className='Card--image' src={data.sprites.front_default} alt={name} />
            <h1 className='Card--name'>{name}</h1>
            <span className='Card--details'>{data.types.map((poke) => poke.type.name)}</span>
        </div>
    )

}