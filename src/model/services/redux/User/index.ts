import { useAppDispatch, useAppSelector } from '../reduxApi/app/hooks'
import { removeWorkouts } from '../reduxApi/features/workouts/workoutsSlice'
import { removeSessions } from '../reduxApi/features/sessions/sessionsSlice'
import {
  selectLoginStatusRdx,
  loginUserRdx,
  logoutUserRdxInRdx
} from '../reduxApi/features/auth/authSlice';

const User = {
  useLogoutUser() {
    const dispatch = useAppDispatch()

    return function logoutUserRdx() {
      dispatch(logoutUserRdxInRdx())
      dispatch(removeWorkouts())
      dispatch(removeSessions())
    }
  },

  useLoginUser() {
    const dispatch = useAppDispatch()
    
    return function storeLoginToken() {
      dispatch(loginUserRdx())
    }
  },

  useGetLoginStatus(): boolean {
    return useAppSelector(selectLoginStatusRdx)
  },
}

export default User
