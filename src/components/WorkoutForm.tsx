import { useState } from 'react';
import TextInputGroup from '../components/TextInputGroup';
import NumberInputGroup from '../components/NumberInputGroup';
import Exercise from './Exercise';
import { WorkoutType } from '../features/workouts/workoutsSlice'

type ExerciseType = {
  name: string,
  reps: number,
  sets: number,
  weight: number,
  unit: string
}

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
  
  
  const handleSubmit = async () => {
    const workoutData = {
      name: state.workoutName,
      description: state.workoutDescription,
      location: state.workoutLocation,
      length: Number(state.workoutLength),
      exercises: state.exercises
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


  function renderExercises(exercises: ExerciseType[]) {
    return exercises.map((exercise, idx) => {
      return <Exercise key={idx} exercise={exercise} />
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
          <label htmlFor="exerciseUnit">Unit:</label>

          <select
            name="exerciseUnit"
            onChange={handleInputChange}
            value={state.exerciseUnit}
          >
            <option value="lbs">lbs</option>
            <option value="kg">kg</option>
          </select>
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