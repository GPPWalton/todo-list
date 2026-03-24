import { useEffect, useState } from "react";
import "./PokemonCard.scss";
const PokemonCard = () => {
    const [pokemon, setPokemon] = useState({});
    const fetchPokemon = () => {
        fetch(import.meta.env.VITE_API_URL)
            //get list of pokemon from api
            .then(response => response.json())
            //randomly pick one and fetch the data
            .then(data => {
                const { url } =
                    data.results[Math.floor(Math.random() * data.count)];
                //secondary fetch
                fetch(url)
                    .then(response => response.json())
                    //get only the data the component uses -de structure
                    .then(({ name, id, species, types, height, cries }) => {
                        setPokemon({ name, id, species, types, height, cries });
                    });
            });
    };
    //on mount
    //TODO make this less wastefull. useQuery?
    useEffect(() => {
        const controller = new AbortController();
        fetchPokemon();
        return () => controller.abort();
    }, []);
    return (
        <article className='pokemon-card'>{pokemon && pokemon.name}</article>
    );
};

export default PokemonCard;
