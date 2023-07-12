import Card from "react-bootstrap/Card";

export default function BackPokeCard(props) {
    return (
        <Card className="flip-card-back" border="dark">
            <Card.Body>
                <Card.Text className="text-white mt-4">
                    <span className="d-block"><strong>Base Experience: {props.base_experience}</strong></span>
                    <span className="d-block"><strong>Height: {props.height}</strong></span>
                    <span className="d-block"><strong>Weight: {props.weight}</strong></span>
                    <span className="d-block"><strong>Forms: {props.forms.join(", ")}</strong></span>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}