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

    return response.data.login
  }
}

export default useLoginUser
