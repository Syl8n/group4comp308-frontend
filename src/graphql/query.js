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