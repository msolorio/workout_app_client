import { useEffect } from 'react'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { useAppSelector } from '../../app/hooks'
import { SessionType } from '../../features/sessions/sessionsSlice'
import { RootState } from '../../app/store'
import DateWidget from '../../components/DateWidget'
import ExerciseInstances from './ExerciseInstances'
import SESSION from '../../queries/sessions/getOneSession'
import COMPLETE_SESSION from '../../queries/sessions/completeSession'

interface Props {
  sessionId: string
}


function ShowSession({match}: RouteComponentProps<Props>) {
  const [completeSession] = useMutation(COMPLETE_SESSION)

  const sessionId = match.params.sessionId
  const sessions: SessionType[] | undefined = useAppSelector((state: RootState) => state.sessions.sessions)

  let currentSession: SessionType | undefined = sessions && sessions.find((session) => session.id === sessionId)

  const { loading, error, data } = useQuery(SESSION, {
    skip: !!currentSession,
    variables: { sessionId }
  })

  useEffect(() => {
    async function triggerCompleteSession() {
      try {
        await completeSession({
          variables: { id: sessionId }
        })
      } catch (err) {
        console.error('Error marking session as complete:', err)
      }
    }

    if (currentSession?.completed) {
      triggerCompleteSession()
    }
  
  }, [currentSession?.completed, sessionId, completeSession])

  
  if (data) currentSession = data.session
  
  if (loading) return <h2>Loading...</h2>
  
  if (error) {
    console.log('Something went wrong')
    return <Redirect to="/sessions" />
  }

  if (!currentSession) {
    console.log('No session found with that id')
    return <Redirect to="/sessions" />
  }

  
  
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