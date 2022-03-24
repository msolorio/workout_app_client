import { ExerciseInstanceType } from "../../features/exerciseInstance/exerciseInstancesSlice"
import RepsAndSets from './RepsAndSets'

interface Props {
  exInst: ExerciseInstanceType
  sessionId: string
}

function ExerciseInstance({ exInst, sessionId }: Props) {
  const exInstId = exInst.id
  const {
    name,
    weight,
    unit,
    reps,
    sets
  } = exInst.exercise
  
  const completed = exInst.setsCompleted >= (sets || Infinity)

  return (
    <div className="section">
      <div className="row">
        <label htmlFor="completed" hidden>completed</label>
        <input className="checkbox" type="checkbox" name="completed" checked={completed} readOnly />
        <h2 className="subHeader">{name}</h2>
      </div>
      <span>
        <p className="description">{weight} {unit}</p>
        <RepsAndSets
          exInstId={exInstId}
          reps={reps}
          sets={sets}
          repsCompleted={exInst.repsCompleted}
          setsCompleted={exInst.setsCompleted}
          sessionId={sessionId}
        />
      </span>
    </div>
  )
}

export default ExerciseInstance
