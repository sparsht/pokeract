import FrontPokeCard from "./FrontPokeCard";
import BackPokeCard from "./BackPokeCard";

export default function PokemonCard(props) {
    return (
        <div className="flip-card poke-card">
            <div className="flip-card-inner">
                <FrontPokeCard {...props}/>
                <BackPokeCard {...props} />
            </div>
        </div>
        
    )
}