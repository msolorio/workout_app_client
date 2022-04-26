import { useAppDispatch, useAppSelector } from '../reduxApi/app/hooks'
import {
  selectLoginTokenInRdx,
  storeLoginTokenInRdx,
  removeLoginTokenInRdx
} from '../reduxApi/features/auth/authSlice';
import {
  getLoginTokenFromLocalStorage
} from '../../../../utils/authUtils';
import { removeWorkouts } from '../reduxApi/features/workouts/workoutsSlice'
import { removeSessions } from '../reduxApi/features/sessions/sessionsSlice'

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
  },
  
  useResetData() {
    const dispatch = useAppDispatch()

    return function resetDataRdx() {
      dispatch(removeWorkouts())
      dispatch(removeSessions())
      dispatch(removeLoginTokenInRdx())
    }
  }
}

export default App