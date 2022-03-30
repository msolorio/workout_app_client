import { useState, useEffect } from 'react'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client';
import { WorkoutType, updateWorkoutRdx, selectAllWorkouts, storeWorkouts } from '../../features/workouts/workoutsSlice'
import { selectLoginTokenInRdx } from '../../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import WORKOUTS from '../../queries/workouts/getWorkouts'
import UPDATE_WORKOUT from '../../queries/workouts/updateWorkout'
import WorkoutForm from '../../components/WorkoutForm'
import LoadingScreen from '../LoadingScreen/LoadingScreen'

interface Props {
  workoutId: string
}


function EditWorkout({ match }: RouteComponentProps<Props>) {
  
  const workoutId = match.params.workoutId
  const [state, setState] = useState({ redirectToWorkout: false })
  const dispatch = useAppDispatch()
  
  const [updateWorkout] = useMutation(UPDATE_WORKOUT)
  
  let allWorkouts = useAppSelector(selectAllWorkouts)
  const logintoken: string = useAppSelector(selectLoginTokenInRdx)

  let currentWorkout = allWorkouts?.find((workout: WorkoutType) => workout.id === workoutId)

  const { loading, error, data } = useQuery(WORKOUTS, {
    skip: !!allWorkouts.length
  })

  useEffect(() => {
    if (data) dispatch(storeWorkouts(data.workouts))
  })

  if (data) {
    currentWorkout = data.workouts.find((workout: WorkoutType) => workout.id === workoutId)
  }

  if (loading) return <LoadingScreen />

  if (error) {
    console.log('Something went wrong')
    return <Redirect to="/workouts" />
  }

  if (!currentWorkout) {
    console.log('No workout found with that id')
    return <Redirect to="/workouts" />
  }


  const handleUpdateWorkout = async (workoutData: WorkoutType) => {
    try {
      const response = await updateWorkout({
        variables: { ...workoutData, token: logintoken }
      })

      const workoutFromDb = response.data.updateWorkout

      dispatch(updateWorkoutRdx(workoutFromDb))

      setState({ redirectToWorkout: true })
    }
    catch (err) {
      console.error(err)
    }
  }


  if (state.redirectToWorkout) return <Redirect to={`/workouts/${workoutId}`} />

  return (
    <main className="main">
      <h2 className="pageHeader">Edit Your Workout</h2>
      <WorkoutForm
        handleSubmit={handleUpdateWorkout}
        submitBtnText="Save Workout"
        workoutData={currentWorkout}
      />
    </main>
  )
}

export default EditWorkout
