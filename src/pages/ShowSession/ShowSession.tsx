import { RouteComponentProps } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { storeCurrentSession, SessionType } from '../../features/sessions/sessionsSlice'
import {
  useQuery,
  gql
} from '@apollo/client'

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
  let currentSession = useAppSelector((state) => state.sessions.currentSession)

  // otherwise retrieve from server
  const { loading, error, data } = useQuery(SESSION, {
    skip: !!currentSession,
    variables: { sessionId }
  })
  
  if (loading) return <h2>Loading...</h2>

  if (error) {
    console.log('error ==>', error)
    
    return <h2>Something went wrong. Please try again.</h2>
  }

  if (data) {
    currentSession = data.session as SessionType
    dispatch(storeCurrentSession(currentSession))
  }

  console.log('currentSession ==>', currentSession)
  
  
  console.log('currentSession?.date ==>', currentSession?.date)

  console.log('typeof currentSession?.date ==>', typeof currentSession?.date)
  

  const myDate = new Date(currentSession?.date as number)

  console.log('myDate ==>', myDate)
  
  
  return (
    <section>
      <h2>{currentSession?.workout.name}</h2>
      <p>{}</p>
    </section>
  )
}

export default ShowSession