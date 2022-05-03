import { gql } from '@apollo/client'
import { useAppSelector } from '../../redux/reduxApi/app/hooks'
import { selectLoginTokenInRdx } from '../../redux/reduxApi/features/auth/authSlice';
import { selectAllWorkouts } from '../../redux/reduxApi/features/workouts/workoutsSlice'
import useHandledQuery from '../utils/useHandledQuery'
import { WorkoutType } from '../../../Types'

const WORKOUTS = gql`
  query GetWorkouts {
    workouts {
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
`;

type GetWorkoutsResType = WorkoutType[]

function useGetMyWorkouts(): GetWorkoutsResType {
  const workoutsRdx = useAppSelector(selectAllWorkouts)
  const loggedInStatus = useAppSelector(selectLoginTokenInRdx)
  const response = useHandledQuery(WORKOUTS, {
    skip: !loggedInStatus,
    variables: {}
  })

  const workouts = response.workouts || workoutsRdx || []

  return workouts
}

export default useGetMyWorkouts
