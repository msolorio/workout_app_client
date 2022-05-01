import { Link } from 'react-router-dom'
import { WorkoutType } from '../../../model/Types'

interface Props {
  workouts: WorkoutType[]
}

function IndexWorkoutUi({ workouts }: Props): JSX.Element {
  const workoutsJSX = workouts.map((workout: WorkoutType, idx: number): React.ReactNode => {
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

export default IndexWorkoutUi;
