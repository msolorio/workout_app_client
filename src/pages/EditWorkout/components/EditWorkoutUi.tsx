import WorkoutForm from '../../../components/form/WorkoutForm'
import { WorkoutType } from '../../../model/Types'

interface Props {
  handleUpdateWorkout: (workoutData: WorkoutType) => void
  currentWorkout: WorkoutType
}


function EditWorkoutUi({
  handleUpdateWorkout,
  currentWorkout
}: Props) {
  return (
    <main className="main">
      <h2 className="pageHeader">Edit Your Workout</h2>
      <WorkoutForm
        handleSubmit={handleUpdateWorkout}
        submitBtnText="Save Workout"
        workoutData={currentWorkout}
      />
    </main>
  )
}

export default EditWorkoutUi
