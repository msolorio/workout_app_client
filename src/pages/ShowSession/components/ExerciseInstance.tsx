import { ExerciseInstanceType } from "../../../model/services/redux/reduxApi/features/exerciseInstance/exerciseInstancesSlice"
import RepsAndSets from './RepsAndSets'
import checkImg from './check.png'
import { HandleSetIncrementType } from '../../../model/Types'

interface Props {
  exInst: ExerciseInstanceType
  handleSetIncrement: HandleSetIncrementType
}

function ExerciseInstance({
  exInst,
  handleSetIncrement
}: Props): JSX.Element {
  const exInstId = exInst.id
  const {
    name,
    weight,
    unit,
    reps,
    sets
  } = exInst.exercise
  
  const completed = sets ? (exInst.setsCompleted >= sets) : false

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
            handleSetIncrement={handleSetIncrement}
          />
        </div>
      </span>
    </div>
  )
}

export default ExerciseInstance
