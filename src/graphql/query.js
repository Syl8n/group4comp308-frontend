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