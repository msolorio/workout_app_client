import { Link } from 'react-router-dom';
import kettlebellImg from './weight.png'
import model from '../model'


function Header(): JSX.Element {
  const resetData: () => void = model.App.useResetData()
  const logoutUser: () => void = model.User.useLogoutUser()
  const loginStatus: boolean = model.App.useGetLoginStatus()

  const handleReset = async () => {
    await resetData()
  }

  const handleLogout = async () => {
    await logoutUser()
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
      <li className="nav-li" onClick={handleLogout}>
        <Link className="nav-a" to="/login">Logout</Link>
      </li>
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
        Gymara <img className="kettlebellImg" src={kettlebellImg} alt="kettlebell" />
      </h1>
      <nav className="nav">
        <ul className="nav-ul">
          { loginStatus ? loggedInLinks : loggedOutLinks }
          <li className="nav-li" onClick={handleReset}>
            <Link to="/login">Reset</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;
