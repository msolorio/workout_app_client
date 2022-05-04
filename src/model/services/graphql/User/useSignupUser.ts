import { gql } from '@apollo/client'
import useHandledMutation from '../utils/useHandledMutation'

const SIGNUP_USER = gql`
  mutation Signup($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      user {
        id
        username
      }
    }
  }
`

function useSignupUser() {
  const handledMut = useHandledMutation(SIGNUP_USER)

  return async function signupUserGql(username: string, password: string) {
    const { error } = await handledMut({
      variables: {
        username,
        password
      }
    })

    return { error }
  }
}

export default useSignupUser
