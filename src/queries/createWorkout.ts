import { gql } from '@apollo/client'

const CREATE_WORKOUT = gql`
  mutation CreateWorkoutMutation(
    $name: String!,
    $location: String!,
    $description: String,
    $length: Int,
    $exercises: [InputExercise!]
  ) {
    createWorkout(
      name: $name,
      location: $location,
      description: $description,
      length: $length,
      exercises: $exercises
    ) {
      id
      name
      description
      length
      location
      exercises {
        name
        reps
        sets
        unit
        weight
        id
      }
    }
  }
`;

export default CREATE_WORKOUT
