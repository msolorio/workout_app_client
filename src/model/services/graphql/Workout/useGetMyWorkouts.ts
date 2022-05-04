import { gql } from '@apollo/client'
import { useAppSelector } from '../../redux/reduxApi/app/hooks'
import { selectLoginStatusRdx } from '../../redux/reduxApi/features/auth/authSlice';
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

function useGetMyWorkouts(): WorkoutType[] | null {
  const workoutsRdx = useAppSelector(selectAllWorkouts)
  const loggedInStatus = useAppSelector(selectLoginStatusRdx)
  const response = useHandledQuery(WORKOUTS, {
    skip: !loggedInStatus || !!workoutsRdx,
    variables: {}
  })

  const workouts = response.workouts || null

  return workouts
}

export default useGetMyWorkouts
