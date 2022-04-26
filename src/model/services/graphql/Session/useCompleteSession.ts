import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { useAppSelector } from '../../redux/reduxApi/app/hooks'
import { selectLoginTokenInRdx } from '../../redux/reduxApi/features/auth/authSlice';

const COMPLETE_SESSION = gql`
  mutation CompleteSessionMutation($token: String!, $id: ID!) {
    completeSession(token: $token, id: $id) {
      count
    }
  }
`

function useCompleteSession() {
  const [mutation] = useMutation(COMPLETE_SESSION)
  const token: string = useAppSelector(selectLoginTokenInRdx)

  return async function completeSession(sessionId: string) {
    await mutation({
      variables: { token, id: sessionId }
    })
  }
}

export default useCompleteSession
