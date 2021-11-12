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

function IndexWorkout() {
  const dispatch = useAppDispatch()
  const workouts = useAppSelector(selectAllWorkouts)

  const { loading, error, data } = useQuery(WORKOUTS)

  useEffect(() => {
    if (data) dispatch(storeWorkouts(data.workouts))
  }, [data, dispatch])

  if (loading) return <h2>Loading...</h2>  
  if (error) return <h2>Something went wrong. Please try again.</h2>

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

  return (
    <main>
      <h2>Workouts</h2>
      <ul>{workoutsJSX}</ul>
    </main>
  )
}

export default IndexWorkout;
