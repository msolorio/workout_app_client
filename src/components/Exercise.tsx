import { MouseEvent, ChangeEvent } from 'react'
import { ExerciseType } from '../features/exercises/exercisesSlice'
import TextInputNoLabel from './TextInputNoLabel';
import NumberInputNoLabel from './NumberInputNoLabel'
import UnitSelector from './UnitSelector'

import NumberInputGroup from './NumberInputGroup';

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

  const handleExerciseUpdate = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    props.handleExerciseUpdate(event, props.idx)
  }

  return (
    <div className="section">
      <div className="marginBottom">
        <TextInputNoLabel
          name="name"
          placeholder="Exercise Name"
          value={props.exercise.name}
          handleChange={handleExerciseUpdate}
        />
      </div>
      <div className="row">
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
      </div>
      <div className="row marginBottom">
        <NumberInputNoLabel
          name="weight"
          value={props.exercise.weight as number}
          handleChange={handleExerciseUpdate}
          placeholder="Weight"
        />
        <UnitSelector
          name="unit"
          handleInputChange={handleExerciseUpdate}
          value={props.exercise.unit || ''}
        />
      </div>
      <div className="row_centered">
        <button 
          className="button button_standard"
          onClick={handleRemoveClick}
        >
          Remove
        </button>
      </div>
    </div>
  )
}

export default Exercise;