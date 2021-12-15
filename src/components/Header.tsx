import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks'
import { RootState } from '../app/store'
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
  const currentSessionId = useAppSelector((state: RootState) => state.sessions.currentSession?.id)

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
          {
            currentSessionId && 
            <li><Link to={`/sessions/${currentSessionId}`}>Current Session</Link></li>
          }
          <li><Link to="/sessions">Sessions</Link></li>
          <li onClick={handleReset}>Reset</li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;
