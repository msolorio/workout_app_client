import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { storeNewWorkout } from '../../features/workouts/workoutsSlice'
import { useAppDispatch } from '../../app/hooks'
import WorkoutForm from '../../components/WorkoutForm'


const CREATE_WORKOUT = gql`
  mutation CreateWorkoutMutation(
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

// Create Workout Component //////////////////////////////////////////////////////////////
function CreateWorkout() {
  const [state, setState] = useState({ redirectToWorkouts: false })

  const dispatch = useAppDispatch()

  const [createWorkout] = useMutation(CREATE_WORKOUT);
  
  const handleCreateWorkout = async (workoutData: any) => {
    console.log('called handleCreateWorkout')
    
    try {
      const response = await createWorkout({
        variables: { ...workoutData }
      });

      console.log('createdWorkout ==>', response.data.createWorkout);
      
      const workoutId: string = response.data.createWorkout.id

      dispatch(storeNewWorkout({
        ...workoutData,
        id: workoutId
      }))

      setState({ redirectToWorkouts: true })
      
    } catch (err) {
      console.log('Error creating workout ==>', err);
    }
  }

  if (state.redirectToWorkouts) return <Redirect to="/workouts" />

  return (
    <main>
      <h2>New Workout</h2>
      <WorkoutForm
        handleSubmit={handleCreateWorkout}
        submitBtnText="Create Workout"
      />
    </main>
  )
}

export default CreateWorkout;
