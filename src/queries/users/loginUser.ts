import { gql } from '@apollo/client'

const LOGIN_USER = gql`
  mutation Signup($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
      }
      error
    }
  }
`

export default LOGIN_USER
