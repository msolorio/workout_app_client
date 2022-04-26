import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client';

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

function useResetData() {
  const [mutation] = useMutation(RESET)

  return async function resetDataGql() {
    await mutation()
  }
}

export default useResetData