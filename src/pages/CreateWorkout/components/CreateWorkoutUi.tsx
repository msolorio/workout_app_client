import WorkoutForm from '../../../components/form/WorkoutForm'
import { WorkoutType } from '../../../model/Types'

interface Props {
  handleCreateWorkout: (workoutData: WorkoutType) => void
}

function CreateWorkoutUi({ handleCreateWorkout }: Props): JSX.Element {
  return (
    <main className="main">
      <h2 className="pageHeader">Create New Workout</h2>
      <WorkoutForm
        handleSubmit={handleCreateWorkout}
        submitBtnText="Create Workout"
      />
    </main>
  )
}

export default CreateWorkoutUi;
