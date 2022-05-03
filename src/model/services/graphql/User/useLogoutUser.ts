import { gql } from '@apollo/client'
import useHandledMutation from '../utils/useHandledMutation'

const LOGOUT_USER = gql`
  mutation logout {
    logout {
      success
      error
    }
  }
`

function useLoginUser() {
  const handledMut = useHandledMutation(LOGOUT_USER)

  return async function logoutUser() {
    const { error, success } = await handledMut()

    return { error, success }
  }
}

export default useLoginUser
