import rdx from '../../services/redux'
import gql from '../../services/graphql'

const User = {
  useLoginUser() {
    const loginUserGql = gql.User.useLoginUser()
    const loginUserRdx = rdx.User.useLoginUser()

    return async function loginUser(username: string, password: string) {
      if (username === '' || password === '') {
        return { error: 'All fields are required', }
      }

      const { error } = await loginUserGql(username, password)

      if (error) return {} // no need to return error on failed gql. It is sent to redux.

      if (!error) {
        loginUserRdx()
        
        return { error: null }
      }

      return {
        error: 'There was an error logging in'
      }
    }
  },

  useSignupUser() {
    interface SignupArgs {
      username: string
      password1: string
      password2: string
    }

    const signupUserGql = gql.User.useSignupUser()
    const loginUserRdx = rdx.User.useLoginUser()
    

    return async function signupUser({username, password1, password2}: SignupArgs) {

      if (username === '' || password1 === '' || password2 === '') {
        return {
          error: 'All fields are required',
        }
      }

      if (password1 !== password2) {
        return {
          error: 'Both password fields must match.',
        }
      }


      const { error } = await signupUserGql(username, password1)

      if (error) return { } // no need to return error on failed gql. It is sent to redux.

      if (!error) {
        loginUserRdx()

        return { error: null }
      }

      return {
        error: 'There was an error signing up',
      }
    }
  },

  useLogoutUser() {
    const logoutUserGql = gql.User.useLogoutUser()
    const logoutUserRdx = rdx.User.useLogoutUser()

    return async function logoutUser() {
      await logoutUserGql()
      logoutUserRdx()

      window.location.reload()
    }
  }
}

export default User
