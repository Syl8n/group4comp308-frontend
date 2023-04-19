import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { GET_PREVIOUS_VISITS, GET_MEMBER } from '../../graphql/query';
import { useNavigate } from 'react-router-dom';

const PreviousVisits = () => {
    const navigate = useNavigate();
    const { id: patientId } = useParams();
    const nurseId = localStorage.getItem('userId')
    console.log('nurse id: ', nurseId)
    const { loading: memberLoading, error: memberError, data: memberData } = useQuery(GET_MEMBER, {
        variables: { _id: patientId },
    });
    const { loading: vitalSignsLoading, error: vitalSignsError, data: vitalSignsData,  refetch: refetchVisits, } = useQuery(GET_PREVIOUS_VISITS, {
        variables: { memberId: patientId },
    });

    useEffect(() => {
        refetchVisits()
      }, []);

    if (memberLoading || vitalSignsLoading) {
        return <p>Loading...</p>;
    }

    if (memberError || vitalSignsError) {
        return <p>Error: {memberError ? memberError.message : vitalSignsError.message}</p>;
    }

    const { firstname, lastname } = memberData.getMember;





    const handleBackBtn = () => {
        navigate('/nurse/' + nurseId);
    };



    return (
        <div className='container'>

            <h2>Previous Visits - {firstname} {lastname}</h2>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Body Temperature</th>
                        <th>Heart Rate</th>
                        <th>Blood Pressure</th>
                        <th>Respiratory Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {vitalSignsData?.getVitalSigns.map((visit) => {
                        console.log(visit.member._id);
                        return (
                            <tr key={visit._id} className={visit.writer._id !== nurseId ? 'highlighted-row' : ''}>
                                <td>{new Date(visit.createdAt).toLocaleString()}</td>
                                <td>{visit.temperature}</td>
                                <td>{visit.heartRate}</td>
                                <td>{visit.bloodPressureMax}/{visit.bloodPressureMin}</td>
                                <td>{visit.respiratoryRate}</td>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan='5' className='text-end'>
                            <small>* Orange rows represent patient-entered vital signs</small>
                        </td>
                    </tr>
                </tfoot>
            </Table>
            <div className='mt-2'>
                <Button variant="secondary" onClick={handleBackBtn}>
                    Back
                </Button>
            </div>

        </div>
    );
};

export default PreviousVisits;