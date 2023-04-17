import React from 'react';
import { Navbar, Nav,  Button, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import cookie from 'js-cookie';

const PatientMenu = () => {
    const { patientId } = useParams();
    const navigate = useNavigate();
    const firstName = localStorage.getItem('firstname');

    const handleLogout = () => {
        // remove the token and user info from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        localStorage.removeItem('firstname');

        // Remove token from cookie
        cookie.remove('token');
        // redirect to login page
        navigate('/');
    };

    return (
        <div>
            <Navbar className='navbar navbar-dark bg-dark'>
                <Container>
                <Navbar.Brand>Welcome, {firstName}!</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link className="nav-link" to={`/patient/${patientId}/emergency-alert`}>Emergency Alert</Nav.Link>
                        <Nav.Link className="nav-link" to={`/patient/${patientId}/fitness-games`}>Fitness Games</Nav.Link>
                        <Nav.Link className="nav-link" to={`/patient/${patientId}/daily-info`}>Daily Info</Nav.Link>
                        <Nav.Link className="nav-link" to={`/patient/${patientId}/symptom-checklist`}>Symptom Checklist</Nav.Link>

                    </Nav>
                   
                        <Button style={{ marginLeft: '100px' }} variant="outline-primary" onClick={handleLogout}>Logout</Button>
                    
                </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* Add your page content here */}
        </div>
    );
};

export default PatientMenu;
