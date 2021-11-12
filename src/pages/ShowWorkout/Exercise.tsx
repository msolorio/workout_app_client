import React from 'react'
import { ExerciseType } from '../../features/exercises/exercisesSlice'

interface Props {
  exercise: ExerciseType
}

function Exercise(props: Props) {
  return (
    <div>
      <h3>{props.exercise.name}</h3>
      <p>Reps: {props.exercise.reps}</p>
      { props.exercise.sets && <p>Sets: {props.exercise.sets}</p> }
      {
        props.exercise.weight
        && props.exercise.unit
        && <p>{props.exercise.weight} {props.exercise.unit}</p>
      }
    </div>
  )
}

export default Exercise