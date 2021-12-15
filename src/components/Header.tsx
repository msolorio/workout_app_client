import { Link } from 'react-router-dom';
import {
  useMutation,
  gql
} from '@apollo/client'

const RESET = gql`
  mutation reset {
    seed
  }
`

function Header() {
  const [resetData] = useMutation(RESET)

  const handleReset = async () => {
    await resetData()
  }

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/workouts">Workouts</Link></li>
          <li><Link to ="/workouts/create">Create</Link></li>
          <li><Link to="/sessions">Sessions</Link></li>
          <li onClick={handleReset}>Reset</li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;
