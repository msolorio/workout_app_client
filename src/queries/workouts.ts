import { gql } from '@apollo/client'

const WORKOUTS = gql`
  query GetWorkouts {
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
  }
`;

export default WORKOUTS