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
      const { error, token } = await loginUserGql(username, password)

      if (token) {
        setLoginTokenInLocalStorage(token)
        storeLoginTokenRdx(token)
        
        return { error: null, success: true }
      }
      

      if (error) return { error, sucess: false }

      return { error: 'There was an error logging in', success: false }
    }
  },

  useSignupUser() {
    const signupUserGql = gql.User.useSignupUser()
    const storeLoginTokenRdx = rdx.App.useStoreLoginToken()

    return async function signupUser(username: string, password: string) {
      const { error, token } = await signupUserGql(username, password)

      if (token) {
        setLoginTokenInLocalStorage(token)
        storeLoginTokenRdx(token)

        return { error: null, success: true }
      }

      if (error) return { error, success: false }

      return { error: 'There was an error signing up', success: false }
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
