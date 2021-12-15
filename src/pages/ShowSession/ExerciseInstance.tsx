import { ExerciseInstanceType } from "../../features/exerciseInstance/exerciseInstancesSlice"
import RepsAndSets from './RepsAndSets'

interface Props {
  exInst: ExerciseInstanceType
}

function ExerciseInstance({ exInst }: Props) {
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
    <div>
      <label htmlFor="completed" hidden>completed</label>
      <input type="checkbox" name="completed" checked={completed} readOnly />
      <div>
        <p>{name}</p>
        <p>{weight} {unit}</p>
        <RepsAndSets
          exInstId={exInstId}
          reps={reps}
          sets={sets}
          repsCompleted={exInst.repsCompleted}
          setsCompleted={exInst.setsCompleted}
        />
      </div>
    </div>
  )
}

export default ExerciseInstance