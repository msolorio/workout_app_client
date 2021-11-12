import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { storeWorkouts } from '../../features/workouts/workoutsSlice'
import { selectAllWorkouts } from '../../features/workouts/workoutsSlice'

import {
  useQuery,
  gql
} from '@apollo/client';

const WORKOUTS = gql`
  query GetWorkouts {
    workouts {
      id
      name
      description
      length
      location
    }
  }
`;

function Workouts() {
  const dispatch = useAppDispatch()
  const workouts = useAppSelector(selectAllWorkouts)
  const loadworkoutsStatus = useAppSelector((state) => state.workouts.status)

  const { loading, error, data } = useQuery(WORKOUTS)

  if (loading) return <h2>Loading...</h2>

  if (error) {
    console.log('Error loading all workouts ==>', error)
    return <h2>Something went wrong. Please try again</h2>
  }

  if (data && loadworkoutsStatus !== 'succeeded') {
    dispatch(storeWorkouts(data.workouts))
  }

  const workoutsJSX = workouts.map((workout: any, idx: number) => {
    return (
      <Link to={`/workouts/${workout.id}`} key={idx}>
        <div>
          <h2>{workout.name}</h2>
          <p>{workout.description}</p>
        </div>
      </Link>
    );
  });

  return <ul>{workoutsJSX}</ul>
}

function IndexWorkout() {
  return (
    <main>
      <h2>Index workout page</h2>
      <Workouts />
    </main>
  )
}

export default IndexWorkout;
