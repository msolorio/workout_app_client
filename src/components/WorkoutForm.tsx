import { ChangeEvent, MouseEvent, useState } from 'react'
import TextInputGroup from '../components/TextInputGroup';
import NumberInputGroup from '../components/NumberInputGroup';
import NumberInputNoLabel from '../components/NumberInputNoLabel';
import UnitSelector from './UnitSelector'
import Exercise from './Exercise';
import { WorkoutType } from '../model/services/redux/reduxApi/features/workouts/workoutsSlice'
import { ExerciseType } from '../model/services/redux/reduxApi/features/exercises/exercisesSlice'

const stateExercises: ExerciseType[] = [];

interface Props {
  handleSubmit: (workout: WorkoutType) => void
  submitBtnText: string
  workoutData?: WorkoutType
}


function WorkoutForm(props: Props) {
  const [state, setState] = useState({
    redirect: false,
    workoutName: props.workoutData?.name || '',
    workoutLocation: props.workoutData?.location || '',
    workoutLength: props.workoutData?.length || '',
    workoutDescription: props.workoutData?.description || '',
    exercises: (props.workoutData?.exercises || stateExercises) as ExerciseType[],
    exerciseName: '',
    exerciseReps: '10',
    exerciseSets: '3',
    exerciseWeight: '10',
    exerciseUnit: 'lbs',
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
    ) => {
    if (Number(event.target.value) < 0) return;
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const handleExerciseAdd = (event: MouseEvent<HTMLInputElement>) => {
    const newExercise = {
      name: state.exerciseName,
      reps: Number(state.exerciseReps),
      sets: Number(state.exerciseSets),
      weight: Number(state.exerciseWeight),
      unit: state.exerciseUnit
    }

    const updatedExercises = [...state.exercises, newExercise] as ExerciseType[];

    setState({
      ...state,
      exercises: updatedExercises,
      exerciseName: '',
      exerciseReps: '10',
      exerciseSets: '3',
      exerciseWeight: '10',
      exerciseUnit: 'lbs',
    });
  }

  const handleRemoveExercise = (idxToRemove: number) => {
    const updatedExercises = state.exercises.filter((ex, idx) => idx !== idxToRemove)

    setState({ ...state, exercises: updatedExercises })
  }
  
  
  const handleSubmit = async () => {
    const workoutData = {
      name: state.workoutName,
      description: state.workoutDescription,
      location: state.workoutLocation,
      length: Number(state.workoutLength),
      exercises: state.exercises,
      id: props.workoutData?.id
    }

    props.handleSubmit(workoutData)

    setState({
      ...state,
      redirect: true,
      workoutName: '',
      workoutLocation: '',
      workoutLength: '',
      workoutDescription: '',
      exerciseName: '',
      exerciseReps: '10',
      exerciseSets: '3',
      exerciseWeight: '10',
      exerciseUnit: 'lbs',
      exercises: stateExercises
    })
  }

  interface Target { name: string, value: string | number }

  interface Event { target: Target }

  const handleExerciseUpdate = (event: Event, exIdx: number) => {
    const fieldName = event.target.name
    let fieldValue = event.target.value
    const exsClone = [...state.exercises]
    const exClone = { ...exsClone[exIdx] }

    if (['reps', 'sets', 'weight'].includes(fieldName)) {
      fieldValue = Number(fieldValue)
    }

    exsClone[exIdx] = {
      ...exClone,
      [fieldName]: fieldValue
    }

    setState({ ...state, exercises: exsClone })
  }


  function renderExercises(exercises: ExerciseType[]) {
    return exercises.map((exercise, idx) => {
      return (
      <Exercise
        key={idx}
        idx={idx}
        exercise={exercise}
        handleRemoveExercise={handleRemoveExercise}
        handleExerciseUpdate={handleExerciseUpdate}
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
          value={state.workoutName}
          handleChange={handleInputChange}
        />

        <TextInputGroup 
          name="workoutLocation"
          labelText="Location"
          value={state.workoutLocation}
          handleChange={handleInputChange}
        />

        <TextInputGroup 
          name="workoutLength"
          labelText="Length"
          value={state.workoutLength}
          placeholder="In minutes"
          handleChange={handleInputChange}
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
            onChange={handleInputChange}
            value={state.workoutDescription}
          />
        </div>
      </div>

      {/* <div className="divider"></div> */}

      <div>

        <div className="section">
          <h3 className="subHeader alignCenter">Add Exercise</h3>

          <TextInputGroup
            name="exerciseName"
            labelText="Name"
            value={state.exerciseName}
            handleChange={handleInputChange}
          />


          <div className="row">
            <NumberInputGroup
              name="exerciseReps"
              labelText="Reps"
              value={state.exerciseReps}
              handleChange={handleInputChange}
            />
            <NumberInputGroup
              name="exerciseSets"
              labelText="Sets"
              value={state.exerciseSets}
              handleChange={handleInputChange}
            />
            
          </div>

          <div className="row marginBottom">
            <NumberInputNoLabel
              name="exerciseWeight"
              value={state.exerciseWeight}
              handleChange={handleInputChange}
            />

            <UnitSelector
              name="exerciseUnit"
              handleInputChange={handleInputChange}
              value={state.exerciseUnit}
            />
          </div>

          <div className="row_centered">
            <input
              className="button button_standard"
              type="button"
              value="Add Exercise"
              onClick={handleExerciseAdd}
            />
          </div>
        </div>

        <div className="divider"></div>

        { renderExercises(state.exercises) }
      </div>

      { state.exercises.length ? <div className="divider"></div> : null }

      <div className="row_centered marginBottom">
        <input
          className="button button_accent"
          type="button"
          value={props.submitBtnText}
          onClick={handleSubmit}
        />
      </div>
    </form>
  )
}

export default WorkoutForm