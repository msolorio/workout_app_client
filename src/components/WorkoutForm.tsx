import { useState, MouseEvent } from 'react';
import TextInputGroup from '../components/TextInputGroup';
import NumberInputGroup from '../components/NumberInputGroup';
import UnitSelector from './UnitSelector'
import Exercise from './Exercise';
import { WorkoutType } from '../features/workouts/workoutsSlice'
import { ExerciseType } from '../features/exercises/exercisesSlice'

// type ExerciseType = {
//   name: string,
//   reps: number,
//   sets: number,
//   weight: number,
//   unit: string
// }

const stateExercises: ExerciseType[] = [];

interface Props {
  // TODO: update Function to proper func sig
  handleSubmit: Function
  submitBtnText: string
  workoutData?: WorkoutType
}

// Create Workout Component //////////////////////////////////////////////////////////////
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

  const handleInputChange = (event: any) => {
    if (event.target.value < 0) return;

    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }


  const handleExerciseAdd = (event: any) => {
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
    console.log('handleExerciseUpdate')
    console.log('event.target.name ==>', event.target.name)
    console.log('exIdx ==>', exIdx)
    console.log('event.target.value ==>', event.target.value)

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
        handleChange={handleInputChange}
      />

      <div>
        <label htmlFor="workoutDescription">Description:</label>
        {' '}
        <textarea
          name="workoutDescription"
          cols={30}
          rows={10}
          placeholder="Optional..."
          onChange={handleInputChange}
          value={state.workoutDescription}
        />
      </div>

      <div>
        <h3>Add Exercise</h3>

        <TextInputGroup
          name="exerciseName"
          labelText="Name"
          value={state.exerciseName}
          handleChange={handleInputChange}
        />

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

        <NumberInputGroup
          name="exerciseWeight"
          labelText="Weight"
          value={state.exerciseWeight}
          handleChange={handleInputChange}
        />

        <div>
          <UnitSelector
            name="exerciseUnit"
            handleInputChange={handleInputChange}
            value={state.exerciseUnit}
          />
        </div>

        <input
          type="button"
          value="Add"
          onClick={handleExerciseAdd}
        />

        { renderExercises(state.exercises) }
      </div>

      <input
        type="button"
        value={props.submitBtnText}
        onClick={handleSubmit}
      />
    </form>
  )
}

export default WorkoutForm