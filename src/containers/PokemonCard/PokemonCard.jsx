import { useEffect, useState } from "react";
import "./PokemonCard.scss";
import Carousel from "../../components/Carousel/Carousel";
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
                    .then(
                        ({
                            name,
                            id,
                            species,
                            types,
                            height,
                            cries,
                            sprites
                        }) => {
                            setPokemon({
                                name,
                                id,
                                species,
                                types,
                                height,
                                cries,
                                sprites: [
                                    sprites.front_default,
                                    sprites.back_default,
                                    sprites.front_female,
                                    sprites.back_female,
                                    sprites.front_shiny,
                                    sprites.back_shiny,
                                    sprites.front_shiny_female,
                                    sprites.back_shiny_female
                                ].filter(sprite => sprite != null)
                            });
                        }
                    );
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
        <article className='pokemon-card'>
            {pokemon && (
                <>
                    <span className='pokemon-card__header'>
                        <h3>{pokemon.name} </h3>
                        <h4>No. {pokemon.id}</h4>
                    </span>
                    <Carousel imgArr={pokemon.sprites} name={pokemon.name} />
                </>
            )}
        </article>
    );
};

export default PokemonCard;
