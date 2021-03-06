import { gql } from '@apollo/client'
import useHandledMutation from '../utils/useHandledMutation'

const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
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

  return async function loginUserGql(username: string, password: string) {
    const { error } = await handledMut({
      variables: {
        username,
        password,
      }
    })

    return { error }
  }
}

export default useLoginUser
