import rdx from '../../services/redux'
import gql from '../../services/graphql'
// import {
//   // setLoginTokenInLocalStorage,
//   removeLoginTokenInLocalStorage
// } from '../../../utils/authUtils'
import { AuthResType } from '../../Types'

const User = {
  useLoginUser() {
    const loginUserGql = gql.User.useLoginUser()
    const loginUserRdx = rdx.User.useLoginUser()

    return async function loginUser(username: string, password: string): Promise<AuthResType> {
      if (username === '' || password === '') {
        return {
          error: 'All fields are required',
          token: null
        }
      }

      const { error, token } = await loginUserGql(username, password)

      if (error) return { error, token: null }

      if (token) {
        // setLoginTokenInLocalStorage(token)
        loginUserRdx()
        
        return { error: null, token }
      }

      return {
        error: 'There was an error logging in',
        token: null
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
    

    return async function signupUser({username, password1, password2}: SignupArgs): Promise<AuthResType> {

      if (username === '' || password1 === '' || password2 === '') {
        return {
          error: 'All fields are required',
          token: null
        }
      }

      if (password1 !== password2) {
        return {
          error: 'Both password fields must match.',
          token: null
        }
      }


      const { error, token } = await signupUserGql(username, password1)

      if (error) return { error, token: null }

      if (token) {
        // setLoginTokenInLocalStorage(token)
        loginUserRdx()

        return { error: null, token }
      }

      return {
        error: 'There was an error signing up',
        token: null
      }
    }
  },

  useLogoutUser() {
    const logoutUserRdx = rdx.User.useLogoutUser()
    
    return function logoutUser() {
      // removeLoginTokenInLocalStorage()
      logoutUserRdx()
    }
  }
}

export default User
