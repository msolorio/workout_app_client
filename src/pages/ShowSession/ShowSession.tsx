import { RouteComponentProps, Redirect } from 'react-router-dom'
import DateWidget from '../../components/DateWidget'
import ExerciseInstances from './ExerciseInstances'
import model from '../../model/clientOps'
import { SessionType } from '../../model/Types'

interface Props {
  sessionId: string
}


function ShowSession({match}: RouteComponentProps<Props>) {  
  const { sessionId } = match.params
  const currentSession = model.Session.useGetSessionById(sessionId)
  const incrementSet = model.ExerciseInstance.useIncrementSet()


  const handleSetIncrement = async (
    exInstId: string,
    setsCompleted: number,
    maxSets: number
  ) => {
    incrementSet(exInstId, setsCompleted, maxSets, currentSession as SessionType)
  }


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
          <p className="description marginBottom">
            {currentSession.completed ? <span>completed</span> : <span className="accent-text">in-progress</span>}
          </p>
        </div>
      </section>

      <div className="divider"></div>

      <section>
        <ExerciseInstances
          exInstances={currentSession.exerciseInstances}
          handleSetIncrement={handleSetIncrement}
        />
      </section>
    </main>
  )
}

export default ShowSession