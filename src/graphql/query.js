import {  gql } from '@apollo/client';

export const GET_PATIENT_MEMBERS = gql`
  query {
    getMembers(role: PATIENT) {
      _id
      firstname
      lastname
      username
     
    }
  }
`;

export const GET_MEMBER = gql`
  query GetMember($_id: ID!) {
    getMember(_id: $_id) {
      _id
      firstname
      lastname
      username
  
    }
  }
`;

export const GET_PREVIOUS_VISITS = gql`
query GetVitalSigns($memberId: ID!) {
  getVitalSigns(_id: $memberId) {
    _id
    temperature
    heartRate
    bloodPressureMax
    bloodPressureMin
    respiratoryRate
    member {
      _id
      firstname
      lastname
    }
    writer {
      _id
      firstname
      lastname
    }
    createdAt
  }
}
`;

export const GET_MOTIVATIONAL_TIPS = gql `
query GetTipsByMemberId($memberId: ID!) {
  getTipsByMemberId(memberId: $memberId) {
    _id
    title
    tip
    createdAt
  }
}
`;

export const GET_ACTIVE_EMERGENCY_ALERTS = gql`
  query GetActiveEmergencyAlerts {
    getActiveEmergencyAlerts {
      _id
      patient {
        _id
        firstname
        lastname
      }
      createdAt
      severity
      status
    }
  }
`;