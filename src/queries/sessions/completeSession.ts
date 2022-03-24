import { gql } from '@apollo/client'

const COMPLETE_SESSION = gql`
  mutation CompleteSessionMutation($token: String!, $id: ID!) {
    completeSession(token: $token, id: $id) {
      count
    }
  }
`

export default COMPLETE_SESSION
