import { Link } from 'react-router-dom'
import { WorkoutType } from '../../model/services/redux/reduxApi/features/workouts/workoutsSlice'
import model from '../../model'

function IndexWorkout() {
  const workouts = model.Workout.useGetMyWorkouts()

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
