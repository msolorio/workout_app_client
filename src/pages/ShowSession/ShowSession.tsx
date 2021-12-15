import { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  useQuery,
  gql
} from '@apollo/client'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { storeCurrentSession, SessionType } from '../../features/sessions/sessionsSlice'
import DateWidget from '../../components/DateWidget'
import ExerciseInstances from './ExerciseInstances'

const SESSION = gql`
  query getSession($sessionId: ID!) {
    session(id: $sessionId) {
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

interface Props {
  sessionId: string
}

function ShowSession({match}: RouteComponentProps<Props>) {
  const dispatch = useAppDispatch()

  const sessionId = match.params.sessionId

  // retrieve session from redux
  let session = useAppSelector((state) => state.sessions.currentSession)

  // otherwise retrieve from server
  const { loading, error, data } = useQuery(SESSION, {
    skip: !!session,
    variables: { sessionId }
  })
  
  useEffect(() => {
    if (data) dispatch(storeCurrentSession(data.session))
  }, [data, dispatch])
  
  
  if (loading) return <h2>Loading...</h2>
  
  if (error) {
    console.log('error ==>', error)
    return <h2>Something went wrong. Please try again.</h2>
  }
  
  if (data) {
    session = data.session as SessionType
  }
  
  const currentSession: SessionType = session as SessionType


  return (
    <main>
      <section>
        <h2>{currentSession.workout.name}</h2>
        <div>
          <DateWidget timestamp={currentSession.date} />
          <p>{currentSession.workout.location}</p>
        </div>
      </section>

      {/* TODO: convert to dropdown */}
      <section>
        <p>{currentSession.workout.description}</p>
      </section>

      <section>
        {/* TODO: clicking start initializes timer */}
        <button>Start</button>
        <button>Reset</button>
        <button>Pause</button>
      </section>

      <section>
        <ExerciseInstances
          exInstances={currentSession.exerciseInstances}
        />
      </section>
    </main>
  )
}

export default ShowSession