import { ExerciseInstanceType } from "../../features/exerciseInstance/exerciseInstancesSlice"

interface Props {
  exInst: ExerciseInstanceType
}

function ExerciseInstance({ exInst }: Props) {
  const {
    name,
    weight,
    unit,
    reps,
    sets
  } = exInst.exercise

  return (
    <div>
      <label htmlFor="completed" hidden>completed</label>
      <input type="checkbox" name="completed" />
      <div>
        <p>{name}</p>
        <p>{weight} {unit}</p>

        <p>Reps: {reps}</p>

        {/* TODO: on button click - update DB / update redux */}
        <p>Sets: <button>{exInst.setsCompleted}/{sets}</button></p>
      </div>
    </div>
  )
}

export default ExerciseInstance
