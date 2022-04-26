import rdx from '../../services/redux'
import gql from '../../services/graphql'
import {
  setLoginTokenInLocalStorage,
  removeLoginTokenInLocalStorage
} from '../../../utils/authUtils'


const User = {
  useLoginUser() {
    const loginUserGql = gql.User.useLoginUser()
    const storeLoginTokenRdx = rdx.App.useStoreLoginToken()

    return async function loginUser(username: string, password: string) {
      if (username === '' || password === '') {
        return { error: 'All fields are required' }
      }

      const { error, token } = await loginUserGql(username, password)

      if (error) return { error }

      if (token) {
        setLoginTokenInLocalStorage(token)
        storeLoginTokenRdx(token)
        
        return { error: null }
      }

      return { error: 'There was an error logging in' }
    }
  },

  useSignupUser() {
    interface SignupArgs {
      username: string
      password1: string
      password2: string
    }

    const signupUserGql = gql.User.useSignupUser()
    const storeLoginTokenRdx = rdx.App.useStoreLoginToken()
    

    return async function signupUser({username, password1, password2}: SignupArgs) {

      if (username === '' || password1 === '' || password2 === '') {
        return { error: 'All fields are required' }
      }

      if (password1 !== password2) {
        return { error: 'Both password fields must match.' }
      }


      const { error, token } = await signupUserGql(username, password1)

      if (error) return { error }

      if (token) {
        setLoginTokenInLocalStorage(token)
        storeLoginTokenRdx(token)

        return { error: null }
      }

      return { error: 'There was an error signing up' }
    }
  },

  useLogoutUser() {
    const logoutUserRdx = rdx.User.useLogoutUser()
    
    return function logoutUser() {
      removeLoginTokenInLocalStorage()
      logoutUserRdx()
    }
  }
}

export default User
