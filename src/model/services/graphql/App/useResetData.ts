import { gql } from '@apollo/client'
import useHandledMutation from '../utils/useHandledMutation'

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
  const handledMut = useHandledMutation(RESET)

  return async function resetDataGql(): Promise<void> {
    await handledMut()
  }
}

export default useResetData