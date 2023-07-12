import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { isEmailValid, isPasswordValid } from '../utils';

export default function Login() {
    useEffect(() => localStorage.clear(), []);
    
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;
   
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState({
        email: "",
        password: ""
    });

    function handleChange(e) {
        const value = e.target.value;
        const inputName = e.target.name;

        if (value) {
            setError({ ...error, [inputName]: "" });
        }

        setData({ ...data, [inputName]: value });
    };

    function handleBlur(e) {
        const name = e.target.name;
        if(!data[name]) {
            setError({...error, [name]: "This field is required"});
        }

        switch (name) {
            case "email":
                if (data.email && !isEmailValid(data.email)) {
                    setError({...error, email: "Email is invalid"});
                }
                break;
            
            case "password":
                if (data.password && !isPasswordValid(data.password)) {
                    setError({...error, password: "Password is invalid"});
                }
            break;

            default:
                console.log("default case triggered");
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        }).then((res) => res.json()).then((resp) => {
            localStorage.setItem("name", resp.name);
            localStorage.setItem("email", resp.email);
            localStorage.setItem("token", resp.token);
            navigate('/home');

        }).catch((err) => console.log(err));
    }

    return (
    <Card className="mt-5 mx-auto" style={{width: '28rem'}}>
        <Card.Body>
            <Card.Title className="text-center"><h4>Login</h4></Card.Title>
            <hr />
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" onChange={handleChange} onBlur={handleBlur} required />
                    {error.email && <div className="error text-danger px-2"><small>{error.email}</small></div>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={handleChange} onBlur={handleBlur} required />
                    {error.password && <div className="error text-danger px-2"><small>{error.password}</small></div>}
                </Form.Group>
                <div className="text-center">
                    <Button variant="outline-primary" type="submit">Login</Button>
                </div>
            </Form>
        </Card.Body>
    </Card>
    )
};