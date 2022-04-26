import { gql } from '@apollo/client'
import { useAppSelector } from '../../redux/reduxApi/app/hooks'
import { selectLoginTokenInRdx } from '../../redux/reduxApi/features/auth/authSlice';
import { selectAllWorkouts } from '../../redux/reduxApi/features/workouts/workoutsSlice'
import { useQuery } from '@apollo/client';

const WORKOUTS = gql`
  query GetWorkouts($token: String!) {
    workouts(token: $token) {
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

function useGetMyWorkouts() {
  const token: string = useAppSelector(selectLoginTokenInRdx)
  const workoutsRdx = useAppSelector(selectAllWorkouts)

  const { data } = useQuery(WORKOUTS, {
    skip: !!workoutsRdx.length || !token,
    variables: { token }
  })

  return data?.workouts.length ? data.workouts : workoutsRdx
}

export default useGetMyWorkouts
