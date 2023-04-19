import React, { useState } from "react";
import { Form, Button, Card } from 'react-bootstrap';
import {  useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { ADD_VITAL_SIGNS } from '../../graphql/mutation';


const DailyHealthInformation = () => {
  const navigate = useNavigate();
  const patientid = localStorage.getItem('userId')
  const [addVitalSigns, { addLoading, addError }] = useMutation(ADD_VITAL_SIGNS, {
    onError: (addError) => {
      console.error(addError);
    },
  });

  const [dailyHealthData, setDailyHealthData] = useState({
    bodyTemperature: "",
    heartRate: "",
    bloodPressureMax: "",
    bloodPressureMin: "",
    respiratoryRate: "",
  });

  const handleChange = (event) => {
    setDailyHealthData({
      ...dailyHealthData,
      [event.target.name]: event.target.value,
    });
  };

  const dailyHealthDataFormHandler = async (event) => {
    event.preventDefault();
    console.log(dailyHealthData);
    
    try {
      const { data } = await addVitalSigns({
          variables: {
              form: {
                  memberId: patientid,
                  temperature: parseFloat(dailyHealthData.bodyTemperature),
                  heartRate: parseInt(dailyHealthData.heartRate),
                  bloodPressureMax: parseInt(dailyHealthData.bloodPressureMax),
                  bloodPressureMin: parseInt(dailyHealthData.bloodPressureMin),
                  respiratoryRate: parseInt(dailyHealthData.respiratoryRate),

              },
          },
      });
      console.log(data)

      // Show alert and redirect to nurse's main menu
      if (data && data.addVitalSign) {
          alert('Vital signs submitted successfully!');
          const nurseId = localStorage.getItem('userId');
          navigate('/patient/' + patientid);
      }
  } catch (error) {
      console.error(addError);
      // Handle the error here
  }
  };

  const handleCancel = () => {
    navigate('/patient/' + patientid);
  };

  if (addLoading) return <p>Submitting vital signs...</p>
  if (addError) return <p>Error submitting vital sings: {addError.message}</p>

  return (
    <div className="container">

      <Card border="primary" className='m-auto mt-3 w-50 px-4 shadow-lg p-3 mb-5 bg-body rounded'>
        <Card.Body>
          <Form onSubmit={dailyHealthDataFormHandler} >
            <Card.Title>
              <h3>Enter Vital Signs</h3>
            </Card.Title>
            <Form.Group controlId="formBodyTemperature">
              <Form.Label>Body Temperature (°F)</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                value={dailyHealthData.bodyTemperature}
                onChange={(event) =>
                  setDailyHealthData({
                    ...dailyHealthData,
                    bodyTemperature: event.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formHeartRate">
              <Form.Label>Heart Rate (bpm)</Form.Label>
              <Form.Control
                type="number"
                step="1"
                value={dailyHealthData.heartRate}
                onChange={(event) =>
                  setDailyHealthData({
                    ...dailyHealthData,
                    heartRate: event.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formBloodPressureMax">
              <Form.Label>Blood Pressure Max (mmHg)</Form.Label>
              <Form.Control
                type="number"
                step="1"
                value={dailyHealthData.bloodPressureMax}
                onChange={(event) =>
                  setDailyHealthData({
                    ...dailyHealthData,
                    bloodPressureMax: event.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formBloodPressureMin">
              <Form.Label>Blood Pressure Min (mmHg)</Form.Label>
              <Form.Control
                type="number"
                step="1"
                value={dailyHealthData.bloodPressureMin}
                onChange={(event) =>
                  setDailyHealthData({
                    ...dailyHealthData,
                    bloodPressureMin: event.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formRespiratoryRate">
              <Form.Label>Respiratory Rate (breaths per minute)</Form.Label>
              <Form.Control
                type="number"
                step="1"
                value={dailyHealthData.respiratoryRate}
                onChange={(event) =>
                  setDailyHealthData({
                    ...dailyHealthData,
                    respiratoryRate: event.target.value,
                  })
                }
              />
            </Form.Group>
            <div className="d-flex justify-content-center mt-2">
              <div className="mt-2" style={{ margin: '20px 0' }}>
                <Button variant="primary" type="submit" className="w-100">
                  Submit
                </Button>
              </div>
              <div className=" mt-2" style={{ marginLeft: '100px', margin: '20px 0' }}>
                <Button variant="secondary" onClick={handleCancel} className="w-100">
                  Cancel
                </Button>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DailyHealthInformation;
