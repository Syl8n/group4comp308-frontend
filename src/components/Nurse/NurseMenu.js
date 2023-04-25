import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Table, Dropdown } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { GET_PATIENT_MEMBERS, GET_ACTIVE_EMERGENCY_ALERTS } from '../../graphql/query';
import { useNavigate } from 'react-router-dom';
import cookie from 'js-cookie';


const NurseMenu = () => {
  console.log('re-render');
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const { loading: membersLoading, error: membersError, data: membersData, refetch: refetchMembers, } = useQuery(GET_PATIENT_MEMBERS);
  const { loading: alertsLoading, error: alertsError, data: alertsData, refetch: refetchAlerts, } = useQuery(GET_ACTIVE_EMERGENCY_ALERTS);
  const firstName = localStorage.getItem('firstname');

  let eventSource;
  const sse = async () => {
    eventSource = new EventSource(
      `http://localhost:4000/subscribe`,
      {
        withCredentials: true,
      }
    );

    eventSource.onmessage = async (event) => {
      const res = await event.data;
      console.log(res);
      refetchAlerts();
    };

    eventSource.onerror = async (event) => {
      console.log("sse error");
      eventSource.close();
    };
  }

  useEffect(() => {
    refetchMembers();
    refetchAlerts();
    sse();
    return () => eventSource.close();
  }, []);

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

  const handleTipsSelect = (patient) => {
    navigate(`/sendmotivationaltip/${patient._id}`);
  };

  const handleResolveSelect = (alert) => {
    console.log('alert id' + alert._id)
    navigate(`/resolve-emergency/${alert._id}`)
  }




  return (
    <div>
      <Navbar className="navbar navbar-dark bg-dark custom-navbar" >
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
          {membersData?.getMembers.map((patient) => {
            const activeAlert = alertsData?.getActiveEmergencyAlerts.find(
              (alert) => alert.patient?._id === patient._id
            );
            const severity = activeAlert?.severity;
            const active = activeAlert?.status === 'ACTIVE';

            return (
              <tr
                key={patient._id}
                className={
                  active
                    ? severity?.toLowerCase()
                    : ''
                }
                onClick={() => handlePatientSelect(patient)}
              >
                <td>{patient.firstname}</td>
                <td>{patient.lastname}</td>
                <td style={{ position: 'relative' }}>
                  {patient.username}
                  {selectedPatient?._id === patient._id && (
                    <Dropdown
                      style={{
                        position: 'absolute',
                        right: 20,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 1,
                      }}
                    >
                      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        <i className="fas fa-caret-down" style={{ fontSize: '20px' }}></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {active && (
                          <Dropdown.Item className="text-danger" onClick={() => handleResolveSelect(activeAlert)}>
                            Resolve Emergency
                          </Dropdown.Item>
                        )}
                        <Dropdown.Item onClick={() => handleVitalSignsSelect(patient)}>
                          Enter Vital Signs
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handlePreviousVisitSelect(patient)}>
                          Access Previous Visit Info
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleTipsSelect(patient)}>
                          Send Motivational Tips
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate('/predict')}>
                          Detect Heart Disease
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </td>
              </tr>
            );
          })}
          {membersLoading && <tr><td>Loading...</td></tr>}
          {membersError && <tr><td>Error: <span>{membersError.message}</span></td></tr>}
        </tbody>
      </Table>
    </div>
  );
};

export default NurseMenu;
