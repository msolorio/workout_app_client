import { useAppDispatch, useAppSelector } from '../reduxApi/app/hooks'
import {
  selectLoginTokenInRdx,
  storeLoginTokenInRdx,
  removeLoginTokenInRdx
} from '../reduxApi/features/auth/authSlice';
import {
  getLoginTokenFromLocalStorage
} from '../../../../utils/authUtils';

const App = {
  useSyncToken() {
    const dispatch = useAppDispatch()
    
    const token = getLoginTokenFromLocalStorage()
    
    token
    ? dispatch(storeLoginTokenInRdx(token))
    : dispatch(removeLoginTokenInRdx())
  },

  useStoreLoginToken() {
    const dispatch = useAppDispatch()
    
    return function storeLoginToken(loginToken: string) {
      dispatch(storeLoginTokenInRdx(loginToken))
    }
  },

  useGetLoginToken() {
    return useAppSelector(selectLoginTokenInRdx)
  }
}

export default App