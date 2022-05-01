import { MouseEvent } from 'react'
import TextInputGroup from './TextInputGroup';
import NumberInputGroup from './NumberInputGroup';
import NumberInputNoLabel from './NumberInputNoLabel';
import UnitSelector from './UnitSelector'
import Exercise from './FormExercise';
import { ExerciseType, HandleExUpdateType, HandleRemoveExercise, HandleInputChangeType } from '../../../model/Types'


interface Props {
  handleRemoveExercise: HandleRemoveExercise
  handleExerciseUpdate: HandleExUpdateType
  handleInputChange: HandleInputChangeType
  handleExerciseAdd: (event: MouseEvent<HTMLInputElement>) => any
  handleSubmit: () => void
  workoutName: string
  workoutLocation: string
  workoutLength: string
  workoutDescription: string
  exerciseName: string
  exerciseReps: string
  exerciseSets: string
  exerciseWeight: string
  exerciseUnit: string
  submitBtnText: string
  exercises: ExerciseType[]
}


function WorkoutForm(props: Props): JSX.Element {

  function renderExercises(exercises: ExerciseType[]): React.ReactNode {
    return exercises.map((exercise, idx) => {
      return (
      <Exercise
        key={idx}
        idx={idx}
        exercise={exercise}
        handleRemoveExercise={props.handleRemoveExercise}
        handleExerciseUpdate={props.handleExerciseUpdate}
      />
      )
    });
  }

  return (
    <form>
      <div className="section">
        <TextInputGroup 
          name="workoutName"
          labelText="Name"
          value={props.workoutName}
          handleChange={props.handleInputChange}
        />

        <TextInputGroup 
          name="workoutLocation"
          labelText="Location"
          value={props.workoutLocation}
          handleChange={props.handleInputChange}
        />

        <TextInputGroup 
          name="workoutLength"
          labelText="Length"
          value={props.workoutLength}
          placeholder="In minutes"
          handleChange={props.handleInputChange}
        />

        <div className="form-group-col">
          <label
            className="form-label"
            htmlFor="workoutDescription"
          >
            Description:
          </label>

          <textarea
            className="form-input form-input_textarea"
            name="workoutDescription"
            cols={30}
            rows={10}
            placeholder="Optional..."
            onChange={props.handleInputChange}
            value={props.workoutDescription}
          />
        </div>
      </div>

      <div>

        <div className="section">
          <h3 className="subHeader alignCenter">Add Exercise</h3>

          <TextInputGroup
            name="exerciseName"
            labelText="Name"
            value={props.exerciseName}
            handleChange={props.handleInputChange}
          />


          <div className="row">
            <NumberInputGroup
              name="exerciseReps"
              labelText="Reps"
              value={props.exerciseReps}
              handleChange={props.handleInputChange}
            />
            <NumberInputGroup
              name="exerciseSets"
              labelText="Sets"
              value={props.exerciseSets}
              handleChange={props.handleInputChange}
            />
            
          </div>

          <div className="row marginBottom">
            <NumberInputNoLabel
              name="exerciseWeight"
              value={props.exerciseWeight}
              handleChange={props.handleInputChange}
            />

            <UnitSelector
              name="exerciseUnit"
              handleInputChange={props.handleInputChange}
              value={props.exerciseUnit}
            />
          </div>

          <div className="row_centered">
            <input
              className="button button_standard"
              type="button"
              value="Add Exercise"
              onClick={props.handleExerciseAdd}
            />
          </div>
        </div>

        <div className="divider"></div>

        { renderExercises(props.exercises) }
      </div>

      { props.exercises.length ? <div className="divider"></div> : null }

      <div className="row_centered marginBottom">
        <input
          className="button button_accent"
          type="button"
          value={props.submitBtnText}
          onClick={props.handleSubmit}
        />
      </div>
    </form>
  )
}

export default WorkoutForm