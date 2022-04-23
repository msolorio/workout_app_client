import { Link } from 'react-router-dom'
import { WorkoutType } from '../../redux/app/features/workouts/workoutsSlice'
import { useAppSelector } from '../../redux/app/hooks'
import { selectAllWorkouts } from '../../redux/app/features/workouts/workoutsSlice'

function IndexWorkout() {
  const workouts: WorkoutType[] = useAppSelector(selectAllWorkouts)

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
      <h2 className="pageHeader">My Workouts</h2>
      <ul>{workoutsJSX}</ul>
    </main>
  )
}

export default IndexWorkout;
