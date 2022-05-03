import { useAppDispatch, useAppSelector } from '../reduxApi/app/hooks'
import { removeWorkouts } from '../reduxApi/features/workouts/workoutsSlice'
import { removeSessions } from '../reduxApi/features/sessions/sessionsSlice'
import { removeLoginTokenInRdx } from '../reduxApi/features/auth/authSlice';
import {
  selectLoginTokenInRdx,
  loginUserRdx,
} from '../reduxApi/features/auth/authSlice';

const User = {
  useLogoutUser() {
    const dispatch = useAppDispatch()

    return function logoutUserRdx() {
      dispatch(removeWorkouts())
      dispatch(removeSessions())
      dispatch(removeLoginTokenInRdx())
    }
  },

  useLoginUser() {
    const dispatch = useAppDispatch()
    
    return function storeLoginToken() {
      dispatch(loginUserRdx())
    }
  },

  useGetLoginStatus(): boolean {
    return useAppSelector(selectLoginTokenInRdx)
  },
}

export default User
