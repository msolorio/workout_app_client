import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectAllWorkouts } from '../../features/workouts/workoutsSlice'

function Workouts() {
  const workouts = useAppSelector(selectAllWorkouts)

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
