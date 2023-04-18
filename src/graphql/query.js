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