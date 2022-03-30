import { ExerciseInstanceType } from "../../features/exerciseInstance/exerciseInstancesSlice"
import RepsAndSets from './RepsAndSets'
import checkImg from './check.png'

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
        <h2 className="subHeader accent-text marginBottom">{name}</h2>
        { completed && <img src={checkImg} alt="checkbox" className="checkImg" /> }
      </div>
      <span>
        <div className="row align-top">
          <p className="description">{weight} {unit}</p>
          <RepsAndSets
            exInstId={exInstId}
            reps={reps}
            sets={sets}
            repsCompleted={exInst.repsCompleted}
            setsCompleted={exInst.setsCompleted}
            sessionId={sessionId}
          />
        </div>
      </span>
    </div>
  )
}

export default ExerciseInstance
