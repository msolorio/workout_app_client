import { useEffect } from 'react'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import ShowSessionUi from './components/ShowSessionUi'
import model from '../../model'
import { SessionType } from '../../model/Types'
import { HandleSetIncrementType } from '../../model/Types'

interface Props {
  sessionId: string
}


function ShowSession({match}: RouteComponentProps<Props>): JSX.Element {  
  const { sessionId } = match.params
  const currentSession: SessionType | undefined = model.Session.useGetSessionById(sessionId)
  const incrementSet = model.ExerciseInstance.useIncrementSet()
  const checkCompleteSession = model.Session.useCheckCompleteSession()


  useEffect(() => {
    if (!currentSession) return
    checkCompleteSession(currentSession)

  }, [currentSession, checkCompleteSession])

  
  if (!currentSession) {
    console.log('No session found with that id')
    return <Redirect to="/sessions" />
  }
  
  
  const handleSetIncrement: HandleSetIncrementType = async ({
    exInstId,
    setsCompleted,
    maxSets
  }) => {

    await incrementSet({
      exInstId,
      setsCompleted,
      maxSets,
      currentSession
    })
  }


  return (
    <ShowSessionUi
      currentSession={currentSession}
      handleSetIncrement={handleSetIncrement}
    />
  )
}

export default ShowSession