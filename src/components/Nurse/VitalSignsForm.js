import React, { useState } from "react";
import { Navbar, Form, Button, Card } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MEMBER } from "../../graphql/query";
import { useParams } from "react-router-dom"; // import useParams
import { useNavigate } from "react-router-dom";
import { ADD_VITAL_SIGNS } from "../../graphql/mutation";

const VitalSignsForm = () => {
  const navigate = useNavigate();
  const { id: patientId } = useParams(); // extract patientId from URL
  const { loading, error, data } = useQuery(GET_MEMBER, {
    variables: { _id: patientId },
  });

  const [addVitalSigns, { addLoading, addError }] = useMutation(
    ADD_VITAL_SIGNS,
    {
      onError: (addError) => {
        console.error(addError);
      },
    }
  );

  const [bodyTemperature, setBodyTemperature] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [bloodPressureMax, setBloodPressureMax] = useState("");
  const [bloodPressureMin, setBloodPressureMin] = useState("");
  const [respiratoryRate, setRespiratoryRate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform some action with the entered vital signs data, such as submitting it to a server.
    console.log("Submitted vital signs:", {
      bodyTemperature,
      heartRate,
      bloodPressureMax,
      bloodPressureMin,
      respiratoryRate,
    });

    try {
      const { data } = await addVitalSigns({
        variables: {
          form: {
            memberId: patientId,
            temperature: parseFloat(bodyTemperature),
            heartRate: parseInt(heartRate),
            bloodPressureMax: parseInt(bloodPressureMax),
            bloodPressureMin: parseInt(bloodPressureMin),
            respiratoryRate: parseInt(respiratoryRate),
          },
        },
      });
      console.log(data);

      // Show alert and redirect to nurse's main menu
      if (data && data.addVitalSign) {
        alert("Vital signs submitted successfully!");
        const nurseId = localStorage.getItem("userId");
        navigate("/nurse/" + nurseId);
      }
    } catch (error) {
      console.error(addError);
      // Handle the error here
    }
  };

  const handleCancel = () => {
    const nurseId = localStorage.getItem("userId");
    navigate("/nurse/" + nurseId);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (addLoading) return <p>Submitting vital signs...</p>;
  if (addError) return <p>Error submitting vital sings: {addError.message}</p>;

  const { firstname, lastname } = data.getMember;

  return (
    <div>
      <Navbar className="navbar navbar-dark bg-dark custom-navbar">
        <Navbar.Brand>Vital Signs Page</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
      </Navbar>

      <Card border="primary" className="m-auto mt-3 w-50">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Card.Title>
              <h3>
                Enter Vital Signs for {firstname} {lastname}
              </h3>
            </Card.Title>
            <Form.Group controlId="formBodyTemperature">
              <Form.Label>Body Temperature (°F)</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                value={bodyTemperature}
                onChange={(e) => setBodyTemperature(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formHeartRate">
              <Form.Label>Heart Rate (bpm)</Form.Label>
              <Form.Control
                type="number"
                step="1"
                value={heartRate}
                onChange={(e) => setHeartRate(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBloodPressureMax">
              <Form.Label>Blood Pressure Max (mmHg)</Form.Label>
              <Form.Control
                type="number"
                step="1"
                value={bloodPressureMax}
                onChange={(e) => setBloodPressureMax(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBloodPressureMin">
              <Form.Label>Blood Pressure Min (mmHg)</Form.Label>
              <Form.Control
                type="number"
                step="1"
                value={bloodPressureMin}
                onChange={(e) => setBloodPressureMin(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formRespiratoryRate">
              <Form.Label>Respiratory Rate (breaths per minute)</Form.Label>
              <Form.Control
                type="number"
                step="1"
                value={respiratoryRate}
                onChange={(e) => setRespiratoryRate(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-center mt-2">
              <div className="col-sm-4 px-3" style={{ margin: "20px 0" }}>
                <Button variant="primary" type="submit" className="w-100">
                  Submit
                </Button>
              </div>
              <div
                className="col-sm-4 px-3"
                style={{ marginLeft: "100px", margin: "20px 0" }}
              >
                <Button
                  variant="secondary"
                  onClick={handleCancel}
                  className="w-100"
                >
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

export default VitalSignsForm;
