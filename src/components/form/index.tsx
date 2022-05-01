import { MouseEvent, useState } from 'react'
import {
  WorkoutType,
  ExerciseType,
  HandleExUpdateType,
  HandleRemoveExercise,
  HandleInputChangeType 
} from '../../model/Types'
import WorkoutFormUi from './components/WorkoutFormUi'

const stateExercises: ExerciseType[] = [];

interface Props {
  handleSubmit: (workout: WorkoutType) => void
  submitBtnText: string
  workoutData?: WorkoutType
}


function WorkoutForm(props: Props): JSX.Element {
  const [state, setState] = useState({
    redirect: false,
    workoutName: props.workoutData?.name || '',
    workoutLocation: props.workoutData?.location || '',
    workoutLength: props.workoutData?.length || '',
    workoutDescription: props.workoutData?.description || '',
    exercises: (props.workoutData?.exercises || stateExercises) as ExerciseType[],
    exerciseName: '',
    exerciseReps: '10',
    exerciseSets: '3',
    exerciseWeight: '10',
    exerciseUnit: 'lbs',
  });


  const handleInputChange: HandleInputChangeType = (event) => {
    if (Number(event.target.value) < 0) return;
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }


  const handleExerciseAdd = (event: MouseEvent<HTMLInputElement>) => {
    const newExercise = {
      name: state.exerciseName,
      reps: Number(state.exerciseReps),
      sets: Number(state.exerciseSets),
      weight: Number(state.exerciseWeight),
      unit: state.exerciseUnit
    }

    const updatedExercises: ExerciseType[] = [...state.exercises, newExercise];

    setState({
      ...state,
      exercises: updatedExercises,
      exerciseName: '',
      exerciseReps: '10',
      exerciseSets: '3',
      exerciseWeight: '10',
      exerciseUnit: 'lbs',
    });
  }


  const handleRemoveExercise: HandleRemoveExercise = (idxToRemove) => {
    const updatedExercises: ExerciseType[] = state.exercises.filter((ex, idx) => {
      return idx !== idxToRemove
    })

    setState({ ...state, exercises: updatedExercises })
  }
  
  
  const handleSubmit = async () => {
    const workoutData = {
      name: state.workoutName,
      description: state.workoutDescription,
      location: state.workoutLocation,
      length: Number(state.workoutLength),
      exercises: state.exercises,
      id: props.workoutData?.id
    }

    props.handleSubmit(workoutData)

    setState({
      ...state,
      redirect: true,
      workoutName: '',
      workoutLocation: '',
      workoutLength: '',
      workoutDescription: '',
      exerciseName: '',
      exerciseReps: '10',
      exerciseSets: '3',
      exerciseWeight: '10',
      exerciseUnit: 'lbs',
      exercises: stateExercises
    })
  }


  const handleExerciseUpdate: HandleExUpdateType = (event, exIdx) => {
    const fieldName = event.target.name
    let fieldValue = event.target.value
    const exsClone = [...state.exercises]
    const exClone = { ...exsClone[exIdx] }

    if (['reps', 'sets', 'weight'].includes(fieldName)) {
      fieldValue = Number(fieldValue)
    }

    exsClone[exIdx] = {
      ...exClone,
      [fieldName]: fieldValue
    }

    setState({ ...state, exercises: exsClone })
  }


  return (
    <WorkoutFormUi
      handleInputChange={handleInputChange}
      handleRemoveExercise={handleRemoveExercise}
      handleExerciseUpdate={handleExerciseUpdate}
      handleExerciseAdd={handleExerciseAdd}
      handleSubmit={handleSubmit}
      workoutName={state.workoutName}
      workoutLocation={state.workoutLocation}
      workoutLength={state.workoutLength as string}
      workoutDescription={state.workoutDescription}
      exerciseName={state.exerciseName}
      exerciseReps={state.exerciseReps}
      exerciseSets={state.exerciseSets}
      exerciseWeight={state.exerciseWeight}
      exerciseUnit={state.exerciseUnit}
      submitBtnText={props.submitBtnText}
      exercises={state.exercises}
    />
  )
}

export default WorkoutForm