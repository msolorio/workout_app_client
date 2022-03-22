import { gql } from '@apollo/client'

const COMPLETE_SESSION = gql`
  mutation CompleteSessionMutation($id: ID!) {
    completeSession(id: $id) {
      id
      completed
    }
  }
`

export default COMPLETE_SESSION
