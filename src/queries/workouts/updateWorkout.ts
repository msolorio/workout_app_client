import { gql } from '@apollo/client'

const UPDATE_WORKOUT = gql`
  mutation UpdateWorkoutMutation(
    $token: String!
    $id: ID!
    $name: String
    $location: String
    $description: String
    $length: Int
    $exercises: [InputUpdateExercise!]
  ) {
    updateWorkout(
      token: $token
      id: $id
      name: $name
      location: $location
      description: $description
      length: $length
      exercises: $exercises
    ) {
      id
      name
      location
      description
      length
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

export default UPDATE_WORKOUT