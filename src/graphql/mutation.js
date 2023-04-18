import gql from "graphql-tag";

export const ADD_MEMBER = gql`
  mutation AddMember($input: MemberInput!) {
    addMember(form: $input) {
      _id
      username
      password
      firstname
      lastname
      role
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      member {
        _id
        username
        firstname
        role
      }
      token
    }
  }
`;

export const ADD_VITAL_SIGNS = gql`
mutation AddVitalSigns($form: VitalSignInput!) {
  addVitalSign(form: $form) {
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
  }
}
`;
