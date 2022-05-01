import { useAppDispatch, useAppSelector } from '../reduxApi/app/hooks'
import {
  selectLoginTokenInRdx,
  storeLoginTokenInRdx,
  removeLoginTokenInRdx
} from '../reduxApi/features/auth/authSlice';
import { selectErrorMessage } from '../reduxApi/features/errors/errorsSlice'
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

  useGetLoginToken(): string {
    return useAppSelector(selectLoginTokenInRdx)
  },

  useGetErrorMessage(): string {
    return useAppSelector(selectErrorMessage)
  }
}

export default App