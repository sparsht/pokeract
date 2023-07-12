import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { NavLink, Link, useNavigate } from "react-router-dom";

export default function NavBar() {
    const navigate = useNavigate();
    const name = localStorage.getItem("name");

    function handleLogout() {
        localStorage.clear();
        navigate("/login");
    }

    return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
            <Navbar.Brand href="#home"><img src="/images/charizard-icon.png" width={50} height={50} alt="Pokeract logo" />Pokeract</Navbar.Brand>
            <Nav className="me-auto">
                <NavLink to="/home" className="nav-link">Home</NavLink>
                <NavLink to="/feature" className="nav-link">Features</NavLink>
                <NavLink to="/pricing" className="nav-link">Pricing</NavLink>
            </Nav>
            <Navbar.Text className="justify-content-end">
                Signed in as: <Link to="/login">{name} <img src="/images/logout.png" width={25} alt="Logout icon"/></Link> 
            </Navbar.Text>
        </Container>
    </Navbar>
    )
}