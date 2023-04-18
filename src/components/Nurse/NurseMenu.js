import React, { useState } from 'react';
import { Navbar, Nav, Button, Table, Dropdown } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { GET_PATIENT_MEMBERS } from '../../graphql/query';
import { useNavigate } from 'react-router-dom';
import cookie from 'js-cookie';


const NurseMenu = () => {
    const navigate = useNavigate();
    const [selectedPatient, setSelectedPatient] = useState(null);
    const { loading, error, data } = useQuery(GET_PATIENT_MEMBERS);
    const firstName = localStorage.getItem('firstname');

    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient);
    };

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
    const handleVitalSignsSelect = (patient) => {
        navigate(`/vitalsigns/${patient._id}`);
    };

    const handlePreviousVisitSelect = (patient) => {
        navigate(`/previousvisit/${patient._id}`);
    };


    console.log(data); // make sure data is not undefined

    return (
        <div>
            <Navbar className="navbar navbar-dark bg-dark">
                <Navbar.Brand>Welcome, {firstName}!</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">

                    </Nav>
                    <Button variant="outline-primary" className="mr-2" onClick={handleLogout}>Logout</Button>
                </Navbar.Collapse>

            </Navbar>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>

                    </tr>
                </thead>
                <tbody>
                    {data?.getMembers.map((patient) => (
                        <tr key={patient._id} onClick={() => handlePatientSelect(patient)}>
                            <td>{patient.firstname}</td>
                            <td>{patient.lastname}</td>
                            <td style={{position: 'relative'}}>
                            {patient.username}
                            {selectedPatient?._id === patient._id && (
                            
                                    <Dropdown style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', zIndex: 1  }}>
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                            <i className="fas fa-caret-down" style={{ fontSize: '20px' }}></i>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleVitalSignsSelect(patient)}>Enter Vital Signs</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handlePreviousVisitSelect(patient)}>Access Previous Visit Info</Dropdown.Item>
                                            <Dropdown.Item>Send Motivational Tips</Dropdown.Item>
                                            <Dropdown.Item onClick={() => navigate('/predict')}>Detect Heart Disease</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                            )}
                            </td>
                        </tr>
                    ))}

                    {loading && <tr><td>Loading...</td></tr>}
                    {error && <tr><td>Error: {error.message}</td></tr>}
                </tbody>

            </Table>

        </div>
    );
};

export default NurseMenu;
