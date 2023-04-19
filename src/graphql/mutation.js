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

export const ADD_MOTIVATIONAL_TIP = gql`
mutation AddMotivationalTip($form: TipInput!) {
  addMotivationalTip(form: $form) {
    _id
    title
    tip
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

export const CREATE_EMERGENCY_ALERT = gql`
  mutation AddEmergencyAlert($severity: String!) {
    addEmergencyAlert(severity: $severity) {
      _id
      patient {
        _id
        firstname
        lastname
      }
      createdAt
      severity
    }
  }
`;

export const UPDATE_EMERGENCY_ALERT = gql`
mutation resolveEmergencyAlert($alertId: ID!, $resolution: String!) {
  resolveEmergencyAlert(alertId: $alertId, resolution: $resolution) {
    _id
    patient {
      _id
      firstname
      lastname
    }
    severity
    createdAt
    status
    resolution
  }
}

`;
