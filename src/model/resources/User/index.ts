import rdx from '../../services/redux'
import gql from '../../services/graphql'
import { setLoginTokenInLocalStorage } from '../../../utils/authUtils'

const User = {
  loginUser() {
    const loginUserGql = gql.User.useLoginUser()
    const storeLoginTokenRdx = rdx.App.useStoreLoginToken()

    return async function loginUser(username: string, password: string) {
      const { error, token } = await loginUserGql(username, password)

      if (error) return { error, sucess: false }

      if (token) {
        setLoginTokenInLocalStorage(token)
        storeLoginTokenRdx(token)
      }

      return { success: true }
    }
  }
}

export default User
