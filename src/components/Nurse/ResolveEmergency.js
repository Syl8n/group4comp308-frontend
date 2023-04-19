import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { GET_EMERGENCY_ALERT, GET_MEMBER } from '../../graphql/query';
import { UPDATE_EMERGENCY_ALERT } from '../../graphql/mutation';
import { useNavigate, useParams } from 'react-router-dom';

const ResolveEmergency = () => {
    const navigate = useNavigate();
    const { id: alertId } = useParams();
    const { loading, error, data } = useQuery(GET_EMERGENCY_ALERT, {
        variables: { id: alertId },

        fetchPolicy: 'no-cache',
        nextFetchPolicy: 'no-cache',
        notifyOnNetworkStatusChange: true,
        onCompleted: (data) => {
            const memberId = data.getEmergencyAlertById.patient._id;
            console.log('patient ID:', memberId)
            getPatientInfo({ variables: { _id: memberId } });
        },
    });

    const [getPatientInfo, { data: patientData }] = useLazyQuery(GET_MEMBER);
    const [resolution, setResolution] = useState('');
    const [updateEmergencyAlert] = useMutation(UPDATE_EMERGENCY_ALERT);

    if (loading) return <p> Loading...</p>;
    if (error) return <p> Error.. {error.message} </p>;


    const { severity, createdAt } = data.getEmergencyAlertById;

    const handleSubmit = async (event) => {
        event.preventDefault();

        const confirmed = window.confirm(
            `Are you sure you want to resolve the emergency alert for ${patientData?.getMember?.firstname} ${patientData?.getMember?.lastname}?`
        );
        if (!confirmed) return;


        try {
            const { data } = await updateEmergencyAlert({
                variables: {
                    alertId,
                    resolution,
                },
            });

            console.log(data)

            // Show alert and redirect to nurse's main menu
            if (data) {
                alert('Vital signs submitted successfully!');
                const nurseId = localStorage.getItem('userId');
                navigate('/nurse/' + nurseId);
            }
        } catch (error) {
            console.log(error)
        }



    };
    const handleCancel = () => {
        const nurseId = localStorage.getItem('userId')
        navigate('/nurse/' + nurseId);
    };

    return (
        <Card border="primary" className='m-auto mt-3 w-50'>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Patient Name:</Form.Label>
                        <Form.Control type="text" value={`${patientData?.getMember?.firstname} ${patientData?.getMember?.lastname}`} disabled />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Severity:</Form.Label>
                        <Form.Control type="text" value={severity} disabled />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Time Created:</Form.Label>
                        <Form.Control type="text" value={new Date(createdAt).toLocaleString()} disabled />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Resolution:</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={resolution}
                            onChange={(event) => setResolution(event.target.value)}
                            required
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-center mt-2">
                        <div className="mt-2" style={{ margin: '20px' }}>
                            <Button className="mt-2" variant="primary" type="submit">
                                Resolve Emergency
                            </Button>

                        </div>
                        <div className="mt-2" style={{ margin: '20px' }}>
                            <Button className="mt-2" variant="secondary" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default ResolveEmergency;