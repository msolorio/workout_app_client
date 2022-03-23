import { gql } from '@apollo/client'

const SIGNUP_USER = gql`
  mutation Signup($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      token
      user {
        id
        username
      }
      error
    }
  }
`

export default SIGNUP_USER
