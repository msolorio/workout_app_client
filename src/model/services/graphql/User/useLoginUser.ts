import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'

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
  const [mutation] = useMutation(LOGIN_USER)

  return async function loginUserGql(username: string, password: string) {
    const response = await mutation({
      variables: {
        username,
        password
      }
    })

    const error: string = response.data.login.error
    const token: string = response.data.login.token

    return { error, token }
  }
}

export default useLoginUser
