import { gql } from '@apollo/client'
import useHandledMutation from '../utils/useHandledMutation'
import { AuthResType } from '../../../Types'

const LOGIN_USER = gql`
  mutation Signup($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
      }
      error
    }
  }
`

function useLoginUser() {
  const handledMut = useHandledMutation(LOGIN_USER)

  return async function loginUserGql(username: string, password: string): Promise<AuthResType> {
    const { error, token } = await handledMut({
      variables: {
        username,
        password
      }
    })

    return { error, token }
  }
}

export default useLoginUser
