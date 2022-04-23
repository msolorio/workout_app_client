// import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client'
import { useAppDispatch, useAppSelector } from '../redux/app/hooks'
import { removeWorkouts } from '../redux/app/features/workouts/workoutsSlice'
import { removeSessions } from '../redux/app/features/sessions/sessionsSlice'
import RESET from '../queries/reset'
import { removeLoginTokenInLocalStorage } from '../utils/authUtils'
import { removeLoginTokenInRdx, selectLoginTokenInRdx } from '../redux/app/features/auth/authSlice';
import kettlebellImg from './weight.png'

function Header() {
  const dispatch = useAppDispatch() 
  const [resetData] = useMutation(RESET)

  const loginToken: string = useAppSelector(selectLoginTokenInRdx)

  const handleReset = async () => {
    try {
      await resetData()
      dispatch(removeWorkouts())
      dispatch(removeSessions())
      removeLoginTokenInLocalStorage()
      dispatch(removeLoginTokenInRdx())
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
          <li className="nav-li" onClick={handleReset}>
            <Link to="/login">Reset</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;
