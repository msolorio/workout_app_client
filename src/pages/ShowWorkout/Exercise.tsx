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
        { props.exercise.sets && <span>Sets: {props.exercise.sets}</span> }
        {' '}&nbsp;
        <span>Reps: {props.exercise.reps}</span>
      </p>
      {
        props.exercise.weight
        && props.exercise.unit
        && <p>{props.exercise.weight} {props.exercise.unit}</p>
      }
    </div>
  )
}

export default Exercise