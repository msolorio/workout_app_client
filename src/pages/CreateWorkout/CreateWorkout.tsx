import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { storeNewWorkout, selectAllWorkouts, storeWorkouts } from '../../features/workouts/workoutsSlice'
import { WorkoutType } from '../../features/workouts/workoutsSlice'
import { selectLoginTokenInRdx } from '../../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import WORKOUTS from '../../queries/workouts/getWorkouts'
import CREATE_WORKOUT from '../../queries/workouts/createWorkout'
import WorkoutForm from '../../components/WorkoutForm'
import LoadingScreen from '../LoadingScreen/LoadingScreen'

interface State {
  workoutId: null | string
}

function CreateWorkout() {
  const stateObj: State = { workoutId: null }
  const [state, setState] = useState(stateObj)

  // hooks ///////////////////////////////////////////////////////////////////////////
  const logintoken: string = useAppSelector(selectLoginTokenInRdx)
  let allWorkouts = useAppSelector(selectAllWorkouts)
  const dispatch = useAppDispatch()
  const [createWorkout] = useMutation(CREATE_WORKOUT)



  // Fetching / Setting Data /////////////////////////////////////////////////////////

  // TODO:
  // - General fetching / setting of workout data can be moved higher up
  // - Move initial fetching of user's workouts, sessions to app
  const { loading, error, data } = useQuery(WORKOUTS, {
    skip: !!allWorkouts.length
  })

  useEffect(() => {
    if (data) dispatch(storeWorkouts(data.workouts))
  })

  if (loading) return <LoadingScreen />

  if (error) {
    console.log('Something went wrong')
  }



  // component methods //////////////////////////////////////////////////////////////
  const handleCreateWorkout = async (workoutData: WorkoutType) => {
    try {
      const response = await createWorkout({
        variables: { ...workoutData, token: logintoken }
      });

      const createdWorkout = response.data.createWorkout

      dispatch(storeNewWorkout(createdWorkout))

      setState({ workoutId: createdWorkout.id })
      
    } catch (err) {
      console.log('Error creating workout ==>', err);
    }
  }



  // render /////////////////////////////////////////////////////////////////////////
  if (state.workoutId) return <Redirect to={`/workouts/${state.workoutId}`} />

  return (
    <main className="main">
      <h2 className="pageHeader">Create New Workout</h2>
      <WorkoutForm
        handleSubmit={handleCreateWorkout}
        submitBtnText="Create Workout"
      />
    </main>
  )
}

export default CreateWorkout;
