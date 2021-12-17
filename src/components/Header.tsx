import { Link } from 'react-router-dom';
import {
  useMutation,
  gql
} from '@apollo/client'
import { useAppDispatch } from '../app/hooks'
import { storeWorkouts } from '../features/workouts/workoutsSlice'
import { storeSessions } from '../features/sessions/sessionsSlice'

const RESET = gql`
  mutation reset {
    seed {
      workouts {
        id
        name
        description
        length
        location
        exercises {
          id
          name
          reps
          sets
          weight
          unit
        }
      }
      sessions {
        id
        date
        completed
        workout {
          id
          name
          description
          length
          location
        }
        exerciseInstances {
          id
          setsCompleted
          repsCompleted
          exercise {
            id
            name
            reps
            sets
            weight
            unit
          }
        }
      }
    }
  }
`

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
