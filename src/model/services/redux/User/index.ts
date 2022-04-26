import { useAppDispatch } from '../reduxApi/app/hooks'
import { removeWorkouts } from '../reduxApi/features/workouts/workoutsSlice'
import { removeSessions } from '../reduxApi/features/sessions/sessionsSlice'
import { removeLoginTokenInRdx } from '../reduxApi/features/auth/authSlice';

const User = {
  useLogoutUser() {
    const dispatch = useAppDispatch()

    return function logoutUserRdx() {
      dispatch(removeWorkouts())
      dispatch(removeSessions())
      dispatch(removeLoginTokenInRdx())
    }
  }
}

export default User
