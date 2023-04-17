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
        role
      }
      token
    }
  }
`;