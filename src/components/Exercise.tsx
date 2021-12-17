import { MouseEvent } from 'react'
import { ExerciseType } from '../features/exercises/exercisesSlice'
import TextInputNoLabel from '../components/TextInputNoLabel';
import NumberInputNoLabel from '../components/NumberInputNoLabel'
import UnitSelector from './UnitSelector'

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
      {/* <h4>{props.exercise.name}</h4> */}
      <TextInputNoLabel
        name="name"
        placeholder="Exercise Name"
        value={props.exercise.name}
        handleChange={handleExerciseUpdate}
      />
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
      <div>
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
      <button onClick={handleRemoveClick}>Remove</button>
    </div>
  )
}

export default Exercise;