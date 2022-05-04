import { gql } from '@apollo/client'
import useHandledMutation from '../utils/useHandledMutation'
import { SessionOrErrorType } from '../../../Types'

const CREATE_SESSION = gql`
  mutation CreateSessionMutation($workoutId: ID!) {
    createSession(
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

function useCreateSession() {
  const handledMut = useHandledMutation(CREATE_SESSION)

  return async function createSession(workoutId: string): Promise<SessionOrErrorType> {
    const session = await handledMut({
      variables: { workoutId }
    })

    return session
  }
}

export default useCreateSession
