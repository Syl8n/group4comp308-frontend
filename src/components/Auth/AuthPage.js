import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Register from './Registration';


const AuthPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showRegister, setShowRegister] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
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

                            <Form onSubmit={handleSubmit}>
                                <Row className="align-items-end" style={{ marginRight: '20px' }}>
                                    <Col className='d-flex flex-column align-items-end'>
                                        <Row>
                                            <Button variant="primary" type="submit-button" className="custom-button">
                                                Login
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
            {showRegister && <Register />}
        </div>
    );
};

export default AuthPage;