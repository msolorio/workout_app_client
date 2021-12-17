import { MouseEvent } from 'react'
import { ExerciseType } from '../features/exercises/exercisesSlice'
import TextInputGroup from '../components/TextInputGroup';
import NumberInputGroup from '../components/NumberInputGroup';

interface Props {
  exercise: ExerciseType
  handleRemoveExercise: Function
  handleExerciseUpdate: Function
  idx: number,
}

function Exercise(props: Props) {
  const handleRemoveClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    props.handleRemoveExercise(props.idx)
  }

  const handleExerciseUpdate = (event: any) => {
    props.handleExerciseUpdate(event, props.idx)
  }

  return (
    <div>
      <h4>{props.exercise.name}</h4>
      <NumberInputGroup
        name="reps"
        labelText="Reps"
        value={props.exercise.reps}
        handleChange={handleExerciseUpdate}
      />
      <NumberInputGroup
        name="sets"
        labelText="Sets"
        value={props.exercise.sets}
        handleChange={handleExerciseUpdate}
      />
      <p>{props.exercise.weight} {props.exercise.unit}</p>
      <button onClick={handleRemoveClick}>Remove</button>
    </div>
  )
}

export default Exercise;