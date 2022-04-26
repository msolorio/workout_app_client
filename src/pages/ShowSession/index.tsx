import { RouteComponentProps, Redirect } from 'react-router-dom'
import ShowSessionUi from './components/ShowSessionUi'
import model from '../../model'
import { SessionType } from '../../model/Types'

interface Props {
  sessionId: string
}

interface handleSetIncrementArgs {
  exInstId: string
  setsCompleted: number
  maxSets: number
}


function ShowSession({match}: RouteComponentProps<Props>) {  
  const { sessionId } = match.params
  const currentSession: SessionType | undefined = model.Session.useGetSessionById(sessionId)
  const incrementSet = model.ExerciseInstance.useIncrementSet()

  if (!currentSession) {
    console.log('No session found with that id')
    return <Redirect to="/sessions" />
  }


  const handleSetIncrement = async ({
    exInstId,
    setsCompleted,
    maxSets
  }: handleSetIncrementArgs) => {

    incrementSet({
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