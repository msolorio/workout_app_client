import { useState } from 'react';
import TextInputGroup from '../../components/TextInputGroup';
import NumberInputGroup from '../../components/NumberInputGroup';
import Exercise from './components/Exercise';

type ExerciseType = {
  name: string,
  reps: number,
  sets: number,
  weight: number,
  unit: string
}

const stateExercises: ExerciseType[] = [];

function CreateWorkout() {
  const [state, setState] = useState({
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
  });

  const handleInputChange = (event: any) => {
    if (event.target.value < 0) return;

    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const handleExerciseCreate = (event: any) => {
    const newExercise = {
      name: state.exerciseName,
      reps: Number(state.exerciseReps),
      sets: Number(state.exerciseSets),
      weight: Number(state.exerciseWeight),
      unit: state.exerciseUnit
    }

    const updatedExercises = [...state.exercises, newExercise];

    setState({
      ...state,
      exercises: updatedExercises
    });
  }

  function renderExercises(exercises: ExerciseType[]) {
    return exercises.map((exercise, idx) => {
      return <Exercise key={idx} exercise={exercise} />
    });
  }

  return (
    <main>
      <h2>New Workout</h2>
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

          <input
            type="button"
            value="Add"
            onClick={handleExerciseCreate}
          />

          { renderExercises(state.exercises) }
        </div>

        <input
          type="button"
          value="Create Workout" 
        />
      </form>
    </main>
  )
}

export default CreateWorkout;
