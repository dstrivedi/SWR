import useSWR from "swr";
 
const baseURL = 'https://pokeapi.co/api/v2';

export const useRequest = (path:string,name?:string) => {
    if(!path) {
        throw new Error("Path is required")
    }

    const url = name ? baseURL + path + '/' + name : baseURL + path;

    const {data, error, isLoading} = useSWR(url)

    return {data, error, isLoading}
}