import { useEffect } from 'react'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { useAppSelector } from '../../model/services/redux/app/hooks'
import { SessionType } from '../../model/services/redux/features/sessions/sessionsSlice'
import { selectLoginTokenInRdx } from '../../model/services/redux/features/auth/authSlice';
import { RootState } from '../../model/services/redux/app/store'
import DateWidget from '../../components/DateWidget'
import ExerciseInstances from './ExerciseInstances'
import COMPLETE_SESSION from '../../queries/sessions/completeSession'

interface Props {
  sessionId: string
}


function ShowSession({match}: RouteComponentProps<Props>) {

  // TODO: Move to custom hook
  const [completeSession] = useMutation(COMPLETE_SESSION)

  const sessionId = match.params.sessionId

  // TODO: getting data from Redux - Move to custom hook
  const sessions: SessionType[] | undefined = useAppSelector((state: RootState) => state.sessions.sessions)
  const logintoken: string = useAppSelector(selectLoginTokenInRdx)

  // TODO: Create redux selector to getSessionById
  let currentSession: SessionType | undefined = sessions && sessions.find((session) => session.id === sessionId)

  // TODO: GraphQL query - Move to custom hook //////////////////////////////////////
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


  if (!currentSession) {
    console.log('No session found with that id')
    return <Redirect to="/sessions" />
  }
  
  return (
    <main className="main">
      <section>
        <h2 className="pageHeader">{currentSession.workout.name}</h2>
        <div className="row_centered_spread">
          <DateWidget timestamp={currentSession.date} />
          <p className="description marginBottom">{currentSession.completed ? <span>completed</span> : <span className="accent-text">in-progress</span>}</p>
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