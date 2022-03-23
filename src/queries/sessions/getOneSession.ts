import { gql } from '@apollo/client'

const SESSION = gql`
  query getSession($token: String!, $sessionId: ID!) {
    session(token: $token, id: $sessionId) {
      id
      date
      workout {
        id
        name
        description
        length
        location
      }
      completed
      exerciseInstances {
        id
        exercise {
          id
          name
          reps
          sets
          weight
          unit
        }
        setsCompleted
        repsCompleted
      }
    }
  }
`

export default SESSION