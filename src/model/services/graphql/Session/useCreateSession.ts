import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { useAppSelector } from '../../redux/app/hooks'
import { selectLoginTokenInRdx } from '../../redux/features/auth/authSlice'
import { SessionType } from '../../../Types'

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
  const [mutation] = useMutation(CREATE_SESSION)
  const token: string = useAppSelector(selectLoginTokenInRdx)

  return async function createSession(workoutId: string) {
    const response = await mutation({
      variables: { token, workoutId }
    })

    return response.data.createSession
  }
}

export default useCreateSession
