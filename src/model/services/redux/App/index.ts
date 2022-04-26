import { useAppDispatch } from '../reduxApi/app/hooks'
import { storeLoginTokenInRdx, removeLoginTokenInRdx } from '../reduxApi/features/auth/authSlice';
import { getLoginTokenFromLocalStorage } from '../../../../utils/authUtils';

const App = {
  useSyncToken() {
    const dispatch = useAppDispatch()

    const token = getLoginTokenFromLocalStorage()

    token
    ? dispatch(storeLoginTokenInRdx(token))
    : dispatch(removeLoginTokenInRdx())
  }
}

export default App