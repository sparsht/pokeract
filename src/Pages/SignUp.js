import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { isMobileValid, isEmailValid, isPasswordValid } from '../utils';

export default function SignUp() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        email: "",
        mobile_no: "",
        password: "",
        confirm_password: "",
        gender: ""
    });

    const [error, setError] = useState({
        name: "",
        email: "",
        mobile_no: "",
        password: "",
        confirm_password: "",
        gender: ""
    });
    
    const [isError, setIsError] = useState(false);


    function handleChange(e) {
        const value = e.target.value;
        const inputName = e.target.name;

        if (value) {
            setError({ ...error, [inputName]: "" });
        }

        if (inputName === "gender") {
            if (e.target.checked) {
                setData({ ...data, gender: e.target.id });
            }
        } else {
            setData({ ...data, [inputName]: value });
        }
    };

    function handleBlur(e) {
        setIsError(false);
        switch (e.target.name) {
            case "name":
                if (e.target.required && !data.name) {
                    setIsError(true);
                    setError({ ...error, name: "Name is required" });
                } 
                break;

            case "email":
                if (e.target.required && !data.email) {
                    setIsError(true);
                    setError({ ...error, email: "Email is required" });
                }
                if (data.email && !isEmailValid(data.email)) {
                    setIsError(true);
                    setError({ ...error, email: "Email is invalid" });
                }
                break;

            case "mobile_no":
                if (e.target.required && !data.mobile_no) {
                    setIsError(true);
                    setError({ ...error, mobile_no: "Number is required" });
                }

                if (data.mobile_no && !isMobileValid(data.mobile_no)) {
                    setIsError(true);
                    setError({ ...error, mobile_no: "Number should be of 10 digits and can only contain numbers" });
                } 
                break;

            case "password":
                if (e.target.required && !data.password) {
                    setIsError(true);
                    setError({ ...error, password: "Password is required" });
                }
                if (data.password) {
                    if(!isPasswordValid(data.password)) {
                        setIsError(true);
                        setError({ ...error, password: "Password must be of at least 8 characters. Only . and _ are allowed in special characters" });
                    }
                    if(data.confirm_password && data.password !== data.confirm_password) {
                        setIsError(true);
                        setError({ ...error, confirm_password: "Confirm password should be same as password" });
                    }
                }
                break;

            case "confirm_password":
                if (e.target.required && !data.confirm_password) {
                    setIsError(true);
                    setError({ ...error, confirm_password: "Confirm password is required" });
                }
                if (data.confirm_password && data.confirm_password !== data.password) {
                    setIsError(true);
                    setError({ ...error, confirm_password: "Confirm password should be same as password" });
                }
                break;

            case "gender":
                if (e.target.required && !data.gender) {
                    setIsError(true);
                    setError({ ...error, gender: "Gender is required" });
                }
                break;

            default:
                console.log("inside default case");
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        const postBody = {
            name: data.name,
            email: data.email,
            mobile_no: data.mobile_no,
            password: data.password,
            gender: data.gender
        };
       

        if(!isError) {
            saveUser(postBody)
            .then((res) => res.json())
            .then((result) => {
                setData({
                    name: "",
                    email: "",
                    mobile_no: "",
                    password: "",
                    confirm_password: "",
                    gender: ""
                });
                navigate("/login");
            })
            .catch((e) => console.log(e));
        } else {
            return false;
        }
    }

    function saveUser(data) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        return fetch("http://localhost:3001/users", {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data),
        });
    }

    return (
        <>
            <Container>
                <Card className="mx-auto mb-5" id="signup-card" style={{ width: '28rem' }}>
                    <Card.Header className="text-center py-3"><h5 className="mb-0">Sign Up</h5></Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <FloatingLabel controlId="name" label="Name">
                                <Form.Control type="text" placeholder="Name" name="name" value={data.name} onChange={handleChange} onBlur={handleBlur} required />
                            </FloatingLabel>
                            {error.name && <div className="error text-danger px-2"><small>{error.name}</small></div>}
                            <FloatingLabel controlId="email" label="Email Address" className="mt-3">
                                <Form.Control type="text" placeholder="Email Address" name="email" value={data.email} onChange={handleChange} onBlur={handleBlur} required />
                            </FloatingLabel>
                            {error.email && <div className="error text-danger px-2"><small>{error.email}</small></div>}
                            <FloatingLabel controlId="mobile_no" label="Mobile No" className="mt-3">
                                <Form.Control type="text" placeholder="Mobile No" name="mobile_no" value={data.mobile_no} onChange={handleChange} onBlur={handleBlur} required />
                            </FloatingLabel>
                            {error.mobile_no && <div className="error text-danger px-2"><small>{error.mobile_no}</small></div>}
                            <FloatingLabel controlId="password" label="Password" className="mt-3">
                                <Form.Control type="password" placeholder="Password" name="password" value={data.password} onChange={handleChange} onBlur={handleBlur} required />
                            </FloatingLabel>
                            {error.password && <div className="error text-danger px-2"><small>{error.password}</small></div>}
                            <FloatingLabel controlId="confirmPassword" label="Confirm Password" className="mt-3">
                                <Form.Control type="password" placeholder="Confirm Password" name="confirm_password" value={data.confirm_password} onChange={handleChange} onBlur={handleBlur} required />
                            </FloatingLabel>
                            {error.confirm_password && <div className="error text-danger px-2"><small>{error.confirm_password}</small></div>}
                            <Form.Group className="mt-3">
                                <Form.Label>
                                    Gender
                                </Form.Label>
                                <div>
                                    <Form.Check inline label="Male" name="gender" type="radio" id="male" checked={data.gender === "male"} onChange={handleChange} required />
                                    <Form.Check inline label="Female" name="gender" type="radio" id="female" checked={data.gender === "female"} onChange={handleChange} required />
                                    <Form.Check inline label="Other" name="gender" type="radio" id="other" checked={data.gender === "other"} onChange={handleChange} required />
                                </div>
                            </Form.Group>
                            {error.gender && <div className="error text-danger px-2"><small>{error.gender}</small></div>}
                            <div className="text-center mt-4 mb-2">
                                <Button variant="primary" type="submit">Sign Up</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};   