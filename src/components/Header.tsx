import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { storeWorkouts, removeWorkouts } from '../features/workouts/workoutsSlice'
import { storeSessions, removeSessions } from '../features/sessions/sessionsSlice'
import RESET from '../queries/reset'
import { removeLoginTokenInLocalStorage } from '../utils/authUtils'
import { removeLoginTokenInRdx, selectLoginTokenInRdx } from '../features/auth/authSlice';
// import kettlebellImg from './kettlebell.png'
import kettlebellImg from './weight.png'

function Header() {

  const dispatch = useAppDispatch()
  const [resetData] = useMutation(RESET)

  const loginToken: string = useAppSelector(selectLoginTokenInRdx)

  const handleReset = async () => {
    try {
      const response = await resetData()
      const workouts = response.data.seed.workouts
      const sessions = response.data.seed.sessions
  
      dispatch(storeWorkouts(workouts))
      dispatch(storeSessions(sessions))
    } catch (err) {
      console.error(err)
    }
  }

  function handleLogout() {
    removeLoginTokenInLocalStorage()
    dispatch(removeLoginTokenInRdx())
    dispatch(removeWorkouts())
    dispatch(removeSessions())
  }

  const loggedInLinks = (
    <>
      <li className="nav-li">
        <Link className="nav-a" to="/workouts">Workouts</Link>
      </li>
      <li className="nav-li">
        <Link className="nav-a" to ="/workouts/create">Create</Link>
      </li>
      <li className="nav-li">
        <Link className="nav-a" to="/sessions">Sessions</Link>
      </li>
      <li className="nav-li" onClick={handleLogout}><Link className="nav-a" to="/login">Logout</Link></li>
    </>
  )

  const loggedOutLinks = (
    <>
      <li className="nav-li">
        <Link className="nav-a" to="/signup">Signup</Link>
      </li>
      <li className="nav-li">
        <Link className="nav-a" to="/login">Login</Link>
      </li>
    </>
  )

  return (
    <header>
      <h1 className="header-title">
        Gym Buddie <img className="kettlebellImg" src={kettlebellImg} alt="kettlebell" />
      </h1>
      <nav className="nav">
        <ul className="nav-ul">
          { loginToken ? loggedInLinks : loggedOutLinks }
          <li className="nav-li" onClick={handleReset}>Reset</li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;
