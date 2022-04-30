import { gql } from '@apollo/client'
import useHandledMutation from '../utils/useHandledMutation'
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
  const handledMut = useHandledMutation(COMPLETE_SESSION)
  const token: string = useAppSelector(selectLoginTokenInRdx)

  return async function completeSession(sessionId: string): Promise<void> {

    await handledMut({
      variables: { token, id: sessionId }
    })
  }
}

export default useCompleteSession
