import React from 'react'
import { ExerciseType } from '../../features/exercises/exercisesSlice'

interface Props {
  exercise: ExerciseType
}

function Exercise(props: Props) {
  return (
    <div className="section">
      <h3 className="subHeader">{props.exercise.name}</h3>
      <p className="description">
        { props.exercise.sets && <span>Sets: {props.exercise.sets}</span> }
        {' '}&nbsp;
        <span>Reps: {props.exercise.reps}</span>
      </p>
      {
        props.exercise.weight
        && props.exercise.unit
        && <p className="description">{props.exercise.weight} {props.exercise.unit}</p>
      }
    </div>
  )
}

export default Exercise