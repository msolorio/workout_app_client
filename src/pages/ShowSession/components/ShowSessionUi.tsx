import DateWidget from '../../../components/DateWidget'
import ExerciseInstances from './ExerciseInstances'
import { SessionType } from '../../../model/Types'

interface Props {
  currentSession: SessionType
  handleSetIncrement: any
}

function ShowSessionUi({
  currentSession,
  handleSetIncrement
}: Props) {

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

export default ShowSessionUi