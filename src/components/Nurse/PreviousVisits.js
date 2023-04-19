import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { GET_PREVIOUS_VISITS, GET_MEMBER } from "../../graphql/query";
import { useNavigate } from "react-router-dom";

const PreviousVisits = () => {
  const navigate = useNavigate();
  const { id: patientId } = useParams();
  const {
    loading: memberLoading,
    error: memberError,
    data: memberData,
  } = useQuery(GET_MEMBER, {
    variables: { _id: patientId },
  });
  const {
    loading: vitalSignsLoading,
    error: vitalSignsError,
    data: vitalSignsData,
  } = useQuery(GET_PREVIOUS_VISITS, {
    variables: { memberId: patientId },
  });

  if (memberLoading || vitalSignsLoading) {
    return <p>Loading...</p>;
  }

  if (memberError || vitalSignsError) {
    return (
      <p>
        Error: {memberError ? memberError.message : vitalSignsError.message}
      </p>
    );
  }

  const { firstname, lastname } = memberData.getMember;

  const handleBackBtn = () => {
    const nurseId = localStorage.getItem("userId");
    navigate("/nurse/" + nurseId);
  };

  return (
    <div className="container mt-4">
      <h2>
        Previous Visits - {firstname} {lastname}
      </h2>
      <Table striped bordered hover>
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
          {vitalSignsData?.getVitalSigns.map((visit) => (
            <tr key={visit._id}>
              <td>{new Date(visit.createdAt).toLocaleString()}</td>
              <td>{visit.temperature}</td>
              <td>{visit.heartRate}</td>
              <td>
                {visit.bloodPressureMax}/{visit.bloodPressureMin}
              </td>
              <td>{visit.respiratoryRate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="mt-2">
        <Button variant="secondary" onClick={handleBackBtn}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default PreviousVisits;
