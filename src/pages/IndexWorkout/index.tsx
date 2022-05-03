import IndexWorkoutUi from './components/IndexWorkoutUi'
import model from '../../model'

function IndexWorkout(): JSX.Element {
  const workouts = model.Workout.useGetMyWorkouts()

  return (
    <IndexWorkoutUi workouts={workouts} />
  )
}

export default IndexWorkout;
