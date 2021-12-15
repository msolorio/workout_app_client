import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  useQuery,
  gql
} from '@apollo/client'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { storeSessions, SessionType } from '../../features/sessions/sessionsSlice'
import { RootState } from '../../app/store'

const SESSIONS = gql`
  query Sessions {
    sessions {
      id
      date
      workout {
        id
        name
        description
        length
        location
      }
      completed
      exerciseInstances {
        id
        exercise {
          id
          name
          reps
          sets
          weight
          unit
        }
        setsCompleted
        repsCompleted
      }
    }
  }
`

function IndexSession() {
  const dispatch = useAppDispatch()
  const sessions = useAppSelector((state: RootState) => state.sessions.sessions)

  const { loading, error, data } = useQuery(SESSIONS, {
    skip: !!sessions.length
  })

  useEffect(() => {
    if (data) {
      dispatch(storeSessions(data.sessions))
    }
  })

  if (loading) return <h2>Loading...</h2>
  if (error) return <h2>Something went wrong. Please try again.</h2>

  const sessionsJSX = sessions.map((session: SessionType) => {
    return (
      <Link to={`/sessions/${session.id}`} key={session.id}>
        <div>
          <h2>{session.date}</h2>
          <p>{session.workout.name}</p>
          <p>{ session.completed ? "completed" : "in-progress" }</p>
        </div>
      </Link>
    )
  })

  return (
    <main>
      <h2>Session</h2>
      <ul>{sessionsJSX}</ul>
    </main>
  )
}

export default IndexSession
