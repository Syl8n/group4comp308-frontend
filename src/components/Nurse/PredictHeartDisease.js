import React, { useState } from "react";
import { Navbar, Nav, Form, Button, FloatingLabel, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function PredictHeartDisease() {
    const navigate = useNavigate();
    const [patientInfo, setPatientInfo] = useState({
        age: "",
        sex: "",
        chestPainType: "",
        restingBloodPressure: "",
        cholesterol: "",
        fastingBloodSugar: "",
        restingElectrocardiographicResults: "",
        maximumHeartRateAchieved: "",
        exerciseInducedAngina: "",
        oldpeak: "",
        slope: "",
        numberMajorVessels: "",
        thal: "",
        date: new Date().toISOString(),
    });
    const [show, setShow] = useState(false);
    const [result, setResult] = useState();
    const [hasHeartDisease, setHasHeartDisease] = useState(false); // state variable for prediction

    const handleClose = () => {
        setShow(false);
    };

    const handleCancel = () => {
        const nurseId = localStorage.getItem('userId')
        navigate('/nurse/' + nurseId);
    };

    const setAge = (input) => {
        setPatientInfo({ ...patientInfo, age: parseInt(input) });
    };

    const setSex = (input) => {
        setPatientInfo({ ...patientInfo, sex: parseInt(input) });
    };

    const setChestPainType = (input) => {
        setPatientInfo({ ...patientInfo, chestPainType: parseInt(input) });
    };

    const setRestingBloodPressure = (input) => {
        setPatientInfo({ ...patientInfo, restingBloodPressure: parseInt(input) });
    };

    const setCholesterol = (input) => {
        setPatientInfo({ ...patientInfo, cholesterol: parseInt(input) });
    };

    const setFastingBloodSugar = (input) => {
        setPatientInfo({ ...patientInfo, fastingBloodSugar: parseInt(input) });
    };

    const setRestingElectrocardiographicResults = (input) => {
        setPatientInfo({
            ...patientInfo,
            restingElectrocardiographicResults: parseInt(input),
        });
    };

    const setMaximumHeartRateAchieved = (input) => {
        setPatientInfo({ ...patientInfo, maximumHeartRateAchieved: parseInt(input) });
    };

    const setExerciseInducedAngina = (input) => {
        setPatientInfo({ ...patientInfo, exerciseInducedAngina: parseInt(input) });
    };

    const setOldpeak = (input) => {
        setPatientInfo({ ...patientInfo, oldpeak: parseFloat(input) });
    };

    const setSlope = (input) => {
        setPatientInfo({ ...patientInfo, slope: parseInt(input) });
    };

    const setNumberMajorVessels = (input) => {
        setPatientInfo({ ...patientInfo, numberMajorVessels: parseInt(input) });
    };

    const setThal = (input) => {
        setPatientInfo({ ...patientInfo, thal: parseInt(input) });
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const body = {
            data: [
                patientInfo.age,
                patientInfo.sex,
                patientInfo.chestPainType,
                patientInfo.restingBloodPressure,
                patientInfo.cholesterol,
                patientInfo.fastingBloodSugar,
                patientInfo.restingElectrocardiographicResults,
                patientInfo.maximumHeartRateAchieved,
                patientInfo.exerciseInducedAngina,
                patientInfo.oldpeak,
                patientInfo.slope,
                patientInfo.numberMajorVessels,
                patientInfo.thal,
            ],
        };

        try {
            const res = await axios.post(
                "http://localhost:5000/predict",
                body,
                config
            );

            if (res.data.prediction[0] === 1) {
                setHasHeartDisease(true);
            } else {
                setHasHeartDisease(false);
            }

            setResult(res.data);
            setShow(true);
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div>
            <Navbar className="navbar navbar-dark bg-dark custom-navbar">
                <Navbar.Brand>Predict Page</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                </Navbar.Collapse>
            </Navbar>

            <div className="d-flex justify-content-center">
                <div className="card shadow p-3 mt-5">
                    <h1 className="p-3">Heart Disease Prediction</h1>
                    <Form onSubmit={(e) => formSubmit(e)}>
                        <FloatingLabel label="Age" className="mb-3" controlId="age">
                            <Form.Control type="number" placeholder="Age" onChange={e => setAge(e.target.value)} />
                        </FloatingLabel>

                        <FloatingLabel label="Sex" className="mb-3" controlId="sex">
                            <Form.Select aria-label="Sex" onChange={e => setSex(e.target.value)}>
                                <option value="">Select sex</option>
                                <option value="0">Female</option>
                                <option value="1">Male</option>
                            </Form.Select>
                        </FloatingLabel>

                        <FloatingLabel label="Chest Pain Type" className="mb-3" controlId="chestPainType">
                            <Form.Select aria-label="Chest Pain Type" onChange={e => setChestPainType(e.target.value)}>
                                <option value="">Select chest pain type</option>
                                <option value="0">Typical Angina</option>
                                <option value="1">Atypical Angina</option>
                                <option value="2">Non-anginal Pain</option>
                                <option value="3">Asymptomatic</option>
                            </Form.Select>
                        </FloatingLabel>

                        <FloatingLabel label="Resting Blood Pressure (mm Hg)" className="mb-3" controlId="restingBloodPressure">
                            <Form.Control type="number" placeholder="Resting Blood Pressure" onChange={e => setRestingBloodPressure(e.target.value)} />
                        </FloatingLabel>

                        <FloatingLabel label="Cholesterol (mg/dl)" className="mb-3" controlId="cholesterol">
                            <Form.Control type="number" placeholder="Cholesterol" onChange={e => setCholesterol(e.target.value)} />
                        </FloatingLabel>

                        <FloatingLabel label="Fasting Blood Sugar > 120 mg/dl" className="mb-3" controlId="fastingBloodSugar">
                            <Form.Select aria-label="Fasting Blood Sugar" onChange={e => setFastingBloodSugar(e.target.value)}>
                                <option value="">Select fasting blood sugar level</option>
                                <option value="0">Less than or equal to 120 mg/dl</option>
                                <option value="1">Greater than 120 mg/dl</option>
                            </Form.Select>
                        </FloatingLabel>

                        <FloatingLabel label="Resting ECG Results" className="mb-3" controlId="restingECG">
                            <Form.Select aria-label="Resting ECG Results" onChange={e => setRestingElectrocardiographicResults(e.target.value)}>
                                <option value="">Select resting ECG result</option>
                                <option value="0">Normal</option>
                                <option value="1">Having ST-T wave abnormality</option>
                                <option value="2">Left ventricular hypertrophy</option>
                            </Form.Select>
                        </FloatingLabel>

                        <FloatingLabel label="Maximum Heart Rate Achieved" className="mb-3" controlId="maxHeartRate">
                            <Form.Control type="number" placeholder="Maximum Heart Rate" onChange={e => setMaximumHeartRateAchieved(e.target.value)} />
                        </FloatingLabel>

                        <FloatingLabel label="Exercise Induced Angina" className="mb-3" controlId="exerciseInducedAngina">
                            <Form.Select aria-label="Exercise Induced Angina" onChange={e => setExerciseInducedAngina(e.target.value)}>
                                <option value="">Choose...</option>
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                            </Form.Select>
                        </FloatingLabel>

                        <FloatingLabel label="ST Depression Induced by Exercise" className="mb-3" controlId="oldpeak">
                            <Form.Control type="text" placeholder="ST Depression Induced by Exercise" onChange={e => setOldpeak(e.target.value)} />
                        </FloatingLabel>

                        <FloatingLabel label="ST Slope" className="mb-3" controlId="stSlope">
                            <Form.Select aria-label="ST Slope" onChange={e => setSlope(e.target.value)}>
                                <option value="">Choose...</option>
                                <option value="0">Upsloping</option>
                                <option value="1">Flat</option>
                                <option value="2">Downsloping</option>
                            </Form.Select>
                        </FloatingLabel>

                        <FloatingLabel label="Number of Major Vessels" className="mb-3" controlId="numberMajorVessels">
                            <Form.Select aria-label="Number of Major Vessels" onChange={e => setNumberMajorVessels(e.target.value)}>
                                <option value="">Choose...</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </Form.Select>
                        </FloatingLabel>

                        <FloatingLabel label="Thalassemia" className="mb-3" controlId="thalassemia">
                            <Form.Select aria-label="Thalassemia" onChange={e => setThal(e.target.value)}>
                                <option value="">Choose...</option>
                                <option value="1">Normal</option>
                                <option value="2">Fixed Defect</option>
                                <option value="3">Reversible Defect</option>
                            </Form.Select>
                        </FloatingLabel>
                        <div className="d-flex justify-content-center mt-2">
                            <div className="col-sm-4" style={{ margin: '20px 0' }}>
                                <Button variant="primary" type="submit" className="w-100">
                                    Submit
                                </Button>
                            </div>
                            <div className="col-sm-4" style={{ marginLeft: '10px', margin: '20px 0' }}>
                                <Button variant="secondary" onClick={handleCancel} className="w-100">
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Prediction</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex justify-content-center">
                            {hasHeartDisease ? (
                                <p className="text-danger">Patient have heart disease.</p>
                            ) : (
                                <p className="text-success">Patient do not have heart disease.</p>
                            )}
                        </div>
                        <div className="d-flex justify-content-center">
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}

export default PredictHeartDisease