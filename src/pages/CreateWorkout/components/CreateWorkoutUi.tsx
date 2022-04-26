import WorkoutForm from '../../../components/form/WorkoutForm'

interface Props {
  handleCreateWorkout: any
}

function CreateWorkoutUi(props: Props) {
  return (
    <main className="main">
      <h2 className="pageHeader">Create New Workout</h2>
      <WorkoutForm
        handleSubmit={props.handleCreateWorkout}
        submitBtnText="Create Workout"
      />
    </main>
  )
}

export default CreateWorkoutUi;
