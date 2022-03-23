import { gql } from '@apollo/client'

const ONE_WORKOUT = gql`
  query GetOneWorkout($token: String!, $workoutId: ID!) {
    workout(token: $token, id: $workoutId) {
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
  }
`

export default ONE_WORKOUT