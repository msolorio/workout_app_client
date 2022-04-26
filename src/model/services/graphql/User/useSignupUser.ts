import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'

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

  return async function signupUserGql(username: string, password: string) {
    const response = await mutation({
      variables: {
        username,
        password
      }
    })

    console.log('response ==>', response)
    

    const error: string | null = response.data.signup.error
    const token: string = response.data.signup.token

    return { error, token }
  }
}

export default useSignupUser
