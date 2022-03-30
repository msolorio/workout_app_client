import { useEffect } from 'react'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { useAppSelector } from '../../app/hooks'
import { SessionType } from '../../features/sessions/sessionsSlice'
import { selectLoginTokenInRdx } from '../../features/auth/authSlice';
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
  const logintoken: string = useAppSelector(selectLoginTokenInRdx)

  let currentSession: SessionType | undefined = sessions && sessions.find((session) => session.id === sessionId)

  const { loading, error, data } = useQuery(SESSION, {
    skip: !!currentSession,
    variables: {
      token: logintoken,
      sessionId
    }
  })

  useEffect(() => {
    async function triggerCompleteSession() {
      try {
        await completeSession({
          variables: { token: logintoken, id: sessionId }
        })
      } catch (err) {
        console.error('Error marking session as complete:', err)
      }
    }

    if (currentSession?.completed) {
      triggerCompleteSession()
    }
  
  }, [currentSession?.completed, sessionId, completeSession, logintoken])

  
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
    <main className="main">
      <section>
        <h2 className="pageHeader">{currentSession.workout.name}</h2>
        <div className="centerContainer_spread">
          <DateWidget timestamp={currentSession.date} />
          <p className="description marginBottom">{currentSession.completed ? <span className="accent-text">completed</span> : <span>in-progress</span>}</p>
        </div>
      </section>

      <div className="divider"></div>

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