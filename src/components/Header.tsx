import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/client'
import { useAppDispatch } from '../app/hooks'
import { storeWorkouts } from '../features/workouts/workoutsSlice'
import { storeSessions } from '../features/sessions/sessionsSlice'
import RESET from '../queries/reset'
import { removeLoginTokenInLocalStorage } from '../utils/authUtils'
import { removeLoginTokenInRdx } from '../features/auth/authSlice';

function Header() {

  const dispatch = useAppDispatch()
  const [resetData] = useMutation(RESET)

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
  }

  // const handleLogout = () => {
  //   removeSessionToken()
  // }

  // const loggedInLinks = (
  //   <>
  //     <li><Link to="/workouts">Workouts</Link></li>
  //     <li><Link to ="/workouts/create">Create</Link></li>
  //     <li><Link to="/sessions">Sessions</Link></li>
  //     <li onClick={handleLogout}><Link to="/">Logout</Link></li>
  //   </>
  // )

  // const loggedOutLinks = (
  //   <>
  //     <li><Link to="/signup">Signup</Link></li>
  //     <li><Link to="/login">Login</Link></li>
  //   </>
  // )

  return (
    <header>
      <nav>
        <ul>
          <li onClick={handleReset}>Reset</li>

          <li><Link to="/workouts">Workouts</Link></li>
          <li><Link to ="/workouts/create">Create</Link></li>
          <li><Link to="/sessions">Sessions</Link></li>
          <li onClick={handleLogout}><Link to="/">Logout</Link></li>

          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/login">Login</Link></li>
          {/* { userLoggedIn ? loggedInLinks : loggedOutLinks } */}
        </ul>
      </nav>
    </header>
  )
}

export default Header;
