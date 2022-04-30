import { gql } from '@apollo/client'
import useHandledMutation from '../utils/useHandledMutation'
import { AuthResType } from '../../../Types'

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
  const handledMut = useHandledMutation(SIGNUP_USER)

  return async function signupUserGql(username: string, password: string): Promise<AuthResType> {
    const { error, token } = await handledMut({
      variables: {
        username,
        password
      }
    })

    return { error, token }
  }
}

export default useSignupUser
