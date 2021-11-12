import { useEffect } from 'react';
import { useAppSelector } from '../app/hooks'
import { selectAllWorkouts } from '../features/workouts/workoutsSlice'
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
  const workouts = useAppSelector(selectAllWorkouts)

  const workoutsJSX = workouts.map((workout: any, idx: number) => {
    return (
      <div key={idx}>
        <h2>{workout.name}</h2>
        <p>{workout.description}</p>
      </div>
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
