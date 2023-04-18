import React, { useState } from 'react';
import { Container, Form, Row, Col, Card, Button } from 'react-bootstrap';
import PatientMenu from './PatientMenu';

const HeartAttackRiskChecklist = () => {
  const [riskFactors, setRiskFactors] = useState([]);
  const [showRiskLevel, setShowRiskLevel] = useState(false);

  const handleRiskFactorChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setRiskFactors([...riskFactors, value]);
    } else {
      setRiskFactors(riskFactors.filter((factor) => factor !== value));
    }
  };

  const calculateRisk = () => {
    setShowRiskLevel(true);
  };

  const getRiskLevel = () => {
    const riskCount = riskFactors.length;
    if (riskCount < 2) {
      return 'Low';
    } else if (riskCount < 4) {
      return 'Moderate';
    } else {
      return 'High';
    }
  };

  return (
    <div>
    <PatientMenu/>
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Card className="mt-5">
            <Card.Body>
              <Card.Title className="text-center">
                <h2>Heart Attack Risk Checklist</h2>
              </Card.Title>
              <Card.Text>
                <p>Please check the boxes for any factors that apply to you:</p>
                <Form>
                {[
                    { value: 'age', label: 'Age: Over 45 (men) or 55 (women)' },
                    { value: 'familyHistory', label: 'Family history of heart disease' },
                    { value: 'smoking', label: 'Smoking' },
                    { value: 'highBloodPressure', label: 'High blood pressure' },
                    { value: 'highCholesterol', label: 'High cholesterol' },
                    { value: 'obesity', label: 'Obesity (BMI > 30)' },
                    { value: 'diabetes', label: 'Diabetes' },
                    { value: 'physicalInactivity', label: 'Physical inactivity' },
                  ].map(({ value, label }) => (
                    <Form.Check
                      key={value}
                      type="checkbox"
                      value={value}
                      label={label}
                      onChange={handleRiskFactorChange}
                      className="mb-2"
                    />
                  ))}
                </Form>
              </Card.Text>
              <Card.Footer>
                <Button variant="primary" onClick={calculateRisk} className="w-100">
                  Calculate Risk Level
                </Button>
                {showRiskLevel && (
                  <h3 className="text-center mt-3">Your risk level: {getRiskLevel()}</h3>
                )}
              </Card.Footer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default HeartAttackRiskChecklist;
