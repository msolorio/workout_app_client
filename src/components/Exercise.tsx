import { MouseEvent } from 'react'
import { ExerciseType } from '../features/exercises/exercisesSlice'

interface Props {
  exercise: ExerciseType
  handleRemoveExercise: Function
  idx: number
}

function Exercise(props: Props) {
  const handleRemoveClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    props.handleRemoveExercise(props.idx)
  }

  return (
    <div>
      <h4>{props.exercise.name}</h4>
      <p>Reps: {props.exercise.reps}</p>
      <p>Sets: {props.exercise.sets}</p>
      <p>{props.exercise.weight} {props.exercise.unit}</p>
      <button onClick={handleRemoveClick}>Remove</button>
    </div>
  )
}

export default Exercise;