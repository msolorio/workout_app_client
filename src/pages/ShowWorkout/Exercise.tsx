import React from 'react'
import { ExerciseType } from '../../features/exercises/exercisesSlice'

interface Props {
  exercise: ExerciseType
}

function Exercise(props: Props) {
  return (
    <div>
      <h3>{props.exercise.name}</h3>
      <p>
        <span>Reps: {props.exercise.reps}</span>
        {' '}&nbsp;
      { props.exercise.sets && <span>Sets: {props.exercise.sets}</span> }</p>
      {
        props.exercise.weight
        && props.exercise.unit
        && <p>{props.exercise.weight} {props.exercise.unit}</p>
      }
    </div>
  )
}

export default Exercise