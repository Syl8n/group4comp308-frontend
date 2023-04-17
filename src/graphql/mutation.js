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