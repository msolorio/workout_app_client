import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'
import createHandledMutation from '../utils/createHandledMutation'

const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
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
  const [mutation] = useMutation(LOGIN_USER)
  const handledMut = createHandledMutation(mutation)

  return async function loginUserGql(username: string, password: string) {
    const response = await handledMut({
      variables: {
        username,
        password
      }
    })

    const { error, token } = response

    return { error, token }
  }
}

export default useLoginUser
