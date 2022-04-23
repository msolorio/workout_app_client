import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { storeWorkouts } from '../../features/workouts/workoutsSlice'
import { selectAllWorkouts, WorkoutType } from '../../features/workouts/workoutsSlice'
import { selectLoginTokenInRdx } from '../../features/auth/authSlice';
import WORKOUTS from '../../queries/workouts/getWorkouts'
import { useQuery } from '@apollo/client';
import LoadingScreen from '../LoadingScreen/LoadingScreen'

function IndexWorkout() {
  const dispatch = useAppDispatch()
  const workouts = useAppSelector(selectAllWorkouts)
  const logintoken: string = useAppSelector(selectLoginTokenInRdx)  

  // TODO: Move to App //////////////////////////////////////////////////////
  const { loading, error, data } = useQuery(WORKOUTS, {
    skip: !!workouts.length,
    variables: { token: logintoken }
  })

  useEffect(() => {
    if (data) dispatch(storeWorkouts(data.workouts))
  })

  if (loading) return <LoadingScreen />
  if (error) return <h2>Something went wrong. Please try again.</h2>
  ///////////////////////////////////////////////////////////////////////////

  const workoutsJSX = workouts.map((workout: WorkoutType, idx: number) => {
    return (
      <Link to={`/workouts/${workout.id}`} key={idx}>
        <div className="section">
          <h2 className="subHeader accent-text">{workout.name}</h2>
          <p className="description">{workout.description}</p>
        </div>
      </Link>
    );
  });

  return (
    <main className="main">
      <h2 className="pageHeader">Your Workouts</h2>
      <ul>{workoutsJSX}</ul>
    </main>
  )
}

export default IndexWorkout;
