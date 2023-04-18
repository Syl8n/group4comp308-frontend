import React, { useState } from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import Register from './Registration';
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../graphql/mutation";
import cookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const AuthPage = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showRegister, setShowRegister] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [login, { loading, error }] = useMutation(LOGIN);

    const handleLogin = async (e) => {
        e.preventDefault();
        e.preventDefault();
        try {
            const { data } = await login({
                variables: {
                    username,
                    password,
                },
            });
            console.log(data);
            localStorage.setItem('token', data.login.token);
            localStorage.setItem('username', data.login.member.username);
            localStorage.setItem('firstname', data.login.member.firstname);
            localStorage.setItem('userId', data.login.member._id )
            localStorage.setItem('role', data.login.member.role);
            // store the token as a cookie
            cookie.set('token', data.login.token);
            cookie.set('writerId', data.login.member._id)

              // Redirect to the appropriate page based on the user's role
              if (data.login.member.role === 'PATIENT') {
                navigate(`/patient/${data.login.member._id}`);
            } else {
                navigate(`/nurse/${data.login.member._id}`);
            }
        } catch (err) {
            console.error(err);
            setErrorMessage(err.message.replace('GraphQL error: ', ''));
        }
    };

    return (
        <div style={{ backgroundColor: "white" }}>
            <div className='conatiner fluid'>
                <div className="bg-dark jumbotron text-white h-100">
                    <Row className="h-100">
                        <Col md={7} className="d-flex flex-column justify-content-center ">
                            <h1 className="display-4">Welcome to WellnessWatch!</h1>
                            <p className="lead">
                                If you're a patient or nurse, log in to access your account and start monitoring your daily activities.
                            </p>
                        </Col>
                        <Col md={5} className="d-flex flex-column justify-content-end align-items-end">

                            <Form onSubmit={handleLogin}>
                                <Row className="align-items-end" style={{ marginRight: '20px' }}>
                                    <Col className='d-flex flex-column align-items-end'>
                                        <Row>
                                            <Button variant="primary" type="submit-button" className="custom-button" disabled={loading}>
                                            {loading ? "Logging in..." : "Log in"}
                                            </Button>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-0" controlId="formUsername">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                size="sm"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>

                                        <Row className="align-items-center justify-content-center mt-3">

                                            <p className="mb-0">No account?</p>
                                        </Row>
                                        <Row style={{ width: "100px", marginLeft: "15px" }}>
                                            <Button variant="secondary" size="sm" className="mb-5" onClick={() => setShowRegister(true)}>Register</Button>

                                        </Row>
                                        <Form.Group className="mb-0" controlId="formPassword">
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                size="sm"
                                            />
                                        </Form.Group>
                                    </Col>

                                </Row>
                            </Form>
                        </Col>
                    </Row>
                    <hr className="my-4" />

                </div>
            </div>
            {error && <Alert variant="danger">{errorMessage}</Alert>}
            {showRegister && <Register />}
        </div>
    );
};

export default AuthPage;