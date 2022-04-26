import React from 'react'
import { ExerciseType } from '../../model/services/redux/reduxApi/features/exercises/exercisesSlice'

interface Props {
  exercise: ExerciseType
}

function Exercise(props: Props) {
  return (
    <div className="section">
      <h3 className="subHeader accent-text">{props.exercise.name}</h3>
      <div className="row">
        <p>
          { props.exercise.sets && <span className="description">Sets: {props.exercise.sets}</span> }
          <span className="description">Reps: {props.exercise.reps}</span>
        </p>
        {
          props.exercise.weight
          && props.exercise.unit
          && <p className="description">{props.exercise.weight} {props.exercise.unit}</p>
        }
      </div>
    </div>
  )
}

export default Exercise