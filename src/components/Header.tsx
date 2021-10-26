import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/workouts">Workouts</Link></li>
          <li><Link to ="/workouts/create">Create</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;
