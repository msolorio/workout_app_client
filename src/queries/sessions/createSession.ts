import { gql } from '@apollo/client'

const CREATE_SESSION = gql`
  mutation CreateSessionMutation($token: String!, $workoutId: ID!) {
    createSession(
      token: $token
      workoutId: $workoutId
    ) {
      id
      date
      workout {
        id
        name
        description
        length
        location
      }
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

export default CREATE_SESSION
