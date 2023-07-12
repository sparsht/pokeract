import { useState, useEffect, useRef, useCallback } from "react";
import Container from "react-bootstrap/Container";
import PokemonCard from "../Components/PokemonCard";
import { capitalize } from "../utils";
import SkeletonPokeCard from "../Components/SkeletonPokeCard";

const pokemonBaseUrl = `${process.env.REACT_APP_POKEMON_URL}/v2`;
export default function Home() {
    const [pokemons, setPokemons] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const nextUrl = useRef(null);

    useEffect(() => {
        fetchData(`${pokemonBaseUrl}/pokemon?limit=12&offset=0`);
    }, []);

    const handleScroll = useCallback(() => {
        const {scrollHeight, clientHeight, scrollTop} = document.documentElement;
        const scrollableHeight =scrollHeight - clientHeight

        if (scrollTop >= scrollableHeight) {
            fetchData(nextUrl.current);
        }

        return (() => window.removeEventListener("scroll", handleScroll));
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, [handleScroll]);


    async function fetchData(url) {
        setIsLoading(true);
        const res = await fetch(url, {
            method: "get"
        });
        const resp = await res.json();
        nextUrl.current = resp.next;
        const pokemons = resp.results;
        let pokemonsWithAbilities = [];
        
        for (const pokemon of pokemons) {
            const fetchMoreDetails = await fetch(pokemon.url, {
                method: "get"
            });
            const moreDetails = await fetchMoreDetails.json();
            const abilities = moreDetails.abilities.map((entity) => entity.ability.name);
            const types = moreDetails.types.map((entity) => entity.type.name);
            const forms = moreDetails.forms.map((form) => form.name);
            pokemonsWithAbilities.push({name: capitalize(pokemon.name), abilities, types, forms, weight: moreDetails.weight, height: moreDetails.height, base_experience: moreDetails.base_experience });
        }
        setIsLoading(false);
        setPokemons((prevPokemons) => [...prevPokemons, ...pokemonsWithAbilities]);
    };

    return (
        <Container>
            <section className="mt-5">
                <div className="d-flex flex-wrap justify-content-between">
                    {
                        pokemons.map((pokemon) => {
                            return <PokemonCard key={pokemon.name} name={pokemon.name} abilities={pokemon.abilities} types={pokemon.types} forms={pokemon.forms} weight={pokemon.weight} height={pokemon.height} base_experience={pokemon.base_experience} />
                        })
                    }
                    {
                        isLoading && <SkeletonPokeCard count={8}/>
                    }
                </div>

            </section>
        </Container>
    );
};