import { gql } from '@apollo/client'

const RESET = gql`
  mutation reset {
    seed {
      workouts {
        id
        name
        description
        length
        location
        exercises {
          id
          name
          reps
          sets
          weight
          unit
        }
      }
      sessions {
        id
        date
        completed
        workout {
          id
          name
          description
          length
          location
        }
        exerciseInstances {
          id
          setsCompleted
          repsCompleted
          exercise {
            id
            name
            reps
            sets
            weight
            unit
          }
        }
      }
    }
  }
`

export default RESET
