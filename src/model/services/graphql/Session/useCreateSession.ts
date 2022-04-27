import { gql } from '@apollo/client'
import useHandledMutation from '../utils/useHandledMutation'
import { useAppSelector } from '../../redux/reduxApi/app/hooks'
import { selectLoginTokenInRdx } from '../../redux/reduxApi/features/auth/authSlice'

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

function useCreateSession() {
  const handledMut = useHandledMutation(CREATE_SESSION)
  const token: string = useAppSelector(selectLoginTokenInRdx)

  return async function createSession(workoutId: string) {
    const session = await handledMut({
      variables: { token, workoutId }
    })

    return session
  }
}

export default useCreateSession
