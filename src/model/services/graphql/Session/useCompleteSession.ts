import { gql } from '@apollo/client'
import useHandledMutation from '../utils/useHandledMutation'

const COMPLETE_SESSION = gql`
  mutation CompleteSessionMutation($id: ID!) {
    completeSession(id: $id) {
      count
    }
  }
`

function useCompleteSession() {
  const handledMut = useHandledMutation(COMPLETE_SESSION)

  return async function completeSession(sessionId: string): Promise<void> {

    await handledMut({
      variables: { id: sessionId }
    })
  }
}

export default useCompleteSession
