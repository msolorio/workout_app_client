import React, { useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import { RouteComponentProps } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
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
  
  const { workoutId } = match.params
  
  const { loading, error, data } = useQuery(ONE_WORKOUT, {
    variables: { workoutId: workoutId }
  })

  useEffect(() => {
    if (data) dispatch(storeCurrentWorkout(data.workout))
  }, [data, dispatch])

  if (loading) return <h2>Loading...</h2>

  if (error) return <h2>Something went wrong. Please try again.</h2>
  
  const {
    name,
    description,
    length,
    location,
    exercises
  } = data.workout


  const handleStartClick = () => {
    console.log('called handleStartClick')

    // make graphql query to create session
    // passing in workoutId
  }


  function renderExercises(exercises: ExerciseType[]) {
    return exercises.map((ex: any) => {
      return <Exercise exercise={ex} key={ex.id} />
    })
  }

  return (
    <main>
      <h2>{name}</h2>


      { length && <p>{length} minutes</p> }

      { location && <p>{location}</p> }

      <button onClick={handleStartClick}>
        Start
      </button>

      { description && <p>{description}</p> }

      <ul>
        {renderExercises(exercises)}
      </ul>
    </main>
  )
}

export default ShowWorkout