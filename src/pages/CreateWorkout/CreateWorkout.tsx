import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { storeNewWorkout } from '../../features/workouts/workoutsSlice'
import { useAppDispatch } from '../../app/hooks'
import TextInputGroup from '../../components/TextInputGroup';
import NumberInputGroup from '../../components/NumberInputGroup';
import Exercise from './components/Exercise';
import { WorkoutType } from '../../features/workouts/workoutsSlice'


const CREATE_WORKOUT = gql`
  mutation Mutation(
    $name: String!,
    $location: String!,
    $description: String,
    $length: Int,
    $exercises: [InputExercise!]
  ) {
    createWorkout(
      name: $name,
      location: $location,
      description: $description,
      length: $length,
      exercises: $exercises
    ) { id }
  }
`;

type ExerciseType = {
  name: string,
  reps: number,
  sets: number,
  weight: number,
  unit: string
}

const stateExercises: ExerciseType[] = [];

// Create Workout Component //////////////////////////////////////////////////////////////
function CreateWorkout() {
  const dispatch = useAppDispatch()

  const [state, setState] = useState({
    redirect: false,
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


  const [createWorkout] = useMutation(CREATE_WORKOUT);


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

    const updatedExercises = [...state.exercises, newExercise];

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
  
  
  const handleCreateWorkout = async (event: any) => {
    try {
      const response = await createWorkout({
        variables: {
          name: state.workoutName,
          description: state.workoutDescription,
          location: state.workoutLocation,
          length: Number(state.workoutLength),
          exercises: state.exercises
        }
      });

      console.log('createdWorkout ==>', response.data.createWorkout);
      
      const workoutId: string = response.data.createWorkout.id

      dispatch(storeNewWorkout({
        name: state.workoutName,
        description: state.workoutDescription,
        location: state.workoutLocation,
        length: Number(state.workoutLength),
        id: workoutId
      }))

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

    } catch (err) {
      console.log('Error creating workout ==>', err);
    }
  }


  function renderExercises(exercises: ExerciseType[]) {
    return exercises.map((exercise, idx) => {
      return <Exercise key={idx} exercise={exercise} />
    });
  }

  if (state.redirect) return <Redirect to="/workouts" />

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
          value="Create Workout" 
          onClick={handleCreateWorkout}
        />
      </form>
    </main>
  )
}

export default CreateWorkout;
