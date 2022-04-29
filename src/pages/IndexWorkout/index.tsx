import IndexWorkoutUi from './components/IndexWorkoutUi'
import { WorkoutType } from '../../model/Types'
import model from '../../model'

function IndexWorkout(): JSX.Element {
  const workouts: WorkoutType[] = model.Workout.useGetMyWorkouts()

  return (
    <IndexWorkoutUi workouts={workouts} />
  )
}

export default IndexWorkout;
