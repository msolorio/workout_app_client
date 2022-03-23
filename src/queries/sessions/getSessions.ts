import { gql } from '@apollo/client'

const SESSIONS = gql`
  query Sessions($token: String!) {
    sessions(token: $token) {
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

export default SESSIONS
