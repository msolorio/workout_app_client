import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { RouteComponentProps } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { storeCurrentWorkout } from '../../features/workouts/workoutsSlice'
import Exercise from './Exercise'
import { ExerciseType } from '../../features/exercises/exercisesSlice'

const ONE_WORKOUT = gql`
  query GetOneWorkout($workoutId: ID!) {
    workout(id: $workoutId) {
      id
      name
      description
      length
      location
      exercises {
        id
        name
        reps
        sets
        weight
        unit
      }
    }
  }
`

interface Props {
  workoutId: string
}

function ShowWorkout({ match }: RouteComponentProps<Props>) {
  const dispatch = useAppDispatch()
  const currentWorkout = useAppSelector((state) => state.workouts.currentWorkout)
  
  const { workoutId } = match.params
  
  const { loading, error, data } = useQuery(ONE_WORKOUT, {
    variables: { workoutId: workoutId }
  })

  if (loading) return <h2>Loading...</h2>

  if (error) console.log('error ==>', error);
  
  if (data && !currentWorkout) {
    dispatch(storeCurrentWorkout(data.workout))
  }

  console.log('data ==>', data);
  
  const {
    name,
    description,
    length,
    location,
    exercises
  } = data.workout

  function renderExercises(exercises: ExerciseType[]) {
    return exercises.map((ex: any) => {
      return <Exercise exercise={ex} key={ex.id} />
    })
  }

  return (
    <main>
      <h2>{name}</h2>

      <p>{description}</p>

      <p>{length} minutes</p>

      <p>{location}</p>

      <ul>
        {renderExercises(exercises)}
      </ul>
    </main>
  )
}

export default ShowWorkout