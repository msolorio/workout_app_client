import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'
import createHandledMutation from '../utils/createHandledMutation'

const SIGNUP_USER = gql`
  mutation Signup($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      token
      user {
        id
        username
      }
      error
    }
  }
`

function useSignupUser() {
  const [mutation] = useMutation(SIGNUP_USER)
  const handledMut = createHandledMutation(mutation)
  return async function signupUserGql(username: string, password: string) {
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

export default useSignupUser
