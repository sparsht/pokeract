import { Card, Placeholder } from "react-bootstrap";
import { range } from "../utils";

export default function SkeletonPokeCard(props) {
    return range(0, props.count).map((val) => {
        return (
            <Card key={val} className="poke-card" style={{height: "23.5rem"}}>
                <Card.Img variant="top" src={'/images/placeholder.jpeg'} />
                <Card.Body className="text-center">
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={9} />
                        <Placeholder xs={9} />
                    </Placeholder>
                    <Placeholder.Button size={"sm"} variant="primary" xs={7} />
                </Card.Body>
            </Card>
        )
    });
   
}