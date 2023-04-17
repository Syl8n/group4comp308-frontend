import React, { useState } from 'react';
import { Navbar, Nav, Button, Table, Dropdown } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { GET_PATIENT_MEMBERS } from '../../graphql/query';

const NurseMenu = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const { loading, error, data } = useQuery(GET_PATIENT_MEMBERS);

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };



console.log(data); // make sure data is not undefined

  return (
    <div>
      <Navbar className="navbar navbar-dark bg-dark">
        <Navbar.Brand>Welcome, Nurse!</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
    
          </Nav>
          <Button variant="outline-primary" className="mr-2">Logout</Button>
        </Navbar.Collapse>
     
      </Navbar>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
        
          </tr>
        </thead>
        <tbody>
          {data?.patients.map((patient) => (
            <tr key={patient.id} onClick={() => handlePatientSelect(patient)}>
              <td>{patient.firstName}</td>
              <td>{patient.lastName}</td>
        
            </tr>
          ))}
        </tbody>
        {loading && <tr><td>Loading...</td></tr>}
{error && <tr><td>Error: {error.message}</td></tr>}
      </Table>
      {selectedPatient && (
        <Dropdown style={{ position: 'absolute', top: '100px', right: '50px' }}>
          <Dropdown.Toggle variant="secondary">{selectedPatient.firstName} {selectedPatient.lastName}</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Enter Vital Signs</Dropdown.Item>
            <Dropdown.Item>Access Previous Visit Info</Dropdown.Item>
            <Dropdown.Item>Send Motivational Tips</Dropdown.Item>
            <Dropdown.Item>Generate List of Medical Conditions</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
};

export default NurseMenu;
