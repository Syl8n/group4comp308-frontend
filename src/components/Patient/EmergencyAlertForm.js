import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CREATE_EMERGENCY_ALERT } from '../../graphql/mutation';
import { useNavigate } from 'react-router-dom';
import PatientMenu from './PatientMenu'

const EmergencyAlertForm = () => {
    const navigate = useNavigate();
    const patientId = localStorage.getItem('userId');
    const [severity, setSeverity] = useState('');

    const handleSeverityChange = (event) => {
        setSeverity(event.target.value);
    };

    const [createEmergencyAlert] = useMutation(CREATE_EMERGENCY_ALERT, {
        onCompleted: (data) => {
            console.log(data);
            navigate(`/patienthome/${patientId}`);
        },
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await createEmergencyAlert({
                variables: {
                    severity: severity,
                },
            });
            console.log(data)

            // Show alert and redirect to nurse's main menu
            if (data) {
                alert('Nurses have been alerted and will get in touch with you ASAP!');
                navigate('/patienthome/' + patientId);
            }
        } catch (error) {
            console.error(error);
            // Handle the error here
        }

    };
    return (
        <div>
            <PatientMenu/>
            <Container>
                <Card className='m-auto mt-3 w-50 px-4 shadow-lg p-3 mb-5 bg-body rounded'>
                    <Card.Header>
                        <h2 className="text-center">Select Severity of Emergency Alert</h2>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <div className="d-flex flex-column align-items-center">
                                <Button variant="outline-secondary" size="lg" className={`mb-3 w-50 ${severity === 'MILD' && 'active'}`} value="MILD" onClick={handleSeverityChange}>
                                    MILD
                                </Button>
                                <Button variant="warning" size="lg" className={`mb-3 w-50 ${severity === 'SEVERE' && 'active'}`} value="SEVERE" onClick={handleSeverityChange}>
                                    SEVERE
                                </Button>
                                <Button variant="danger" size="lg" className={`mb-3 w-50 ${severity === 'CRITICAL' && 'active'}`} value="CRITICAL" onClick={handleSeverityChange}>
                                    CRITICAL
                                </Button>
                            </div>
                            <Button
                                variant="primary"
                                type="submit"
                                style={{ width: '150px', height: '150px', borderRadius: '75px', fontSize: '35px' }}
                                className="mx-auto d-block mt-3"
                                disabled={!severity}
                            >
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default EmergencyAlertForm;
