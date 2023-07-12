import Card from "react-bootstrap/Card";

export default function FrontPokeCard(props) {
    return (
        <Card className="flip-card-front" border='dark'>
            <Card.Img className="mx-auto mt-2" style={{ width: '10rem', height: '10rem', objectFit: "contain"}} variant="top" src={`/images/${props.name.toLowerCase()}.png`} onError={(e) => e.target.src="/images/placeholder.jpeg"} />
            <Card.Body>
                <Card.Title className="text-center">{props.name}</Card.Title>
                <Card.Text className="mt-4">
                   <span><strong>Abilities: </strong>{props.abilities.join(", ")}</span><br/>
                   <span><strong>Types: </strong>{props.types.join(", ")}</span>
                </Card.Text>
                {/* <div className="text-center"><Button variant="primary" size={"sm"}>Show more details</Button></div> */}
            </Card.Body>
        </Card>
    )
};