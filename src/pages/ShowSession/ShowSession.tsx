import { RouteComponentProps, Redirect } from 'react-router-dom'
import {
  useQuery,
  gql
} from '@apollo/client'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { SessionType } from '../../features/sessions/sessionsSlice'
import { RootState } from '../../app/store'
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
  const sessionId = match.params.sessionId

  const dispatch = useAppDispatch()
  const sessions: SessionType[] | undefined = useAppSelector((state: RootState) => state.sessions.sessions)
  
  let currentSession

  currentSession = sessions && sessions.find((session) => session.id === sessionId)

  const { loading, error, data } = useQuery(SESSION, {
    skip: !!currentSession,
    variables: { sessionId }
  })

  if (data) currentSession = data.session
  
  if (loading) return <h2>Loading...</h2>
  
  if (error) {
    console.log('error ==>', error)
    return <h2>Something went wrong. Please try again.</h2>
  }

  if (!currentSession) {
    console.log('No session found with that id')
    return <Redirect to="/sessions" />
  }

  console.log('currentSession ==>', currentSession)
  
  
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
          sessionId={currentSession.id}
        />
      </section>
    </main>
  )
}

export default ShowSession