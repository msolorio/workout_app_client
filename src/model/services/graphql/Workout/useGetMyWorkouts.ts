import { gql } from '@apollo/client'
import { useAppSelector } from '../../redux/reduxApi/app/hooks'
import { selectLoginTokenInRdx } from '../../redux/reduxApi/features/auth/authSlice';
import { selectAllWorkouts } from '../../redux/reduxApi/features/workouts/workoutsSlice'
import { useQuery } from '@apollo/client';
import { DEFAULT_ERROR } from '../../../../utils/defaultError'

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

  const { data, error } = useQuery(WORKOUTS, {
    skip: !!workoutsRdx.length || !token,
    variables: { token }
  })

  // TODO: Pull error from reponse and return
  if (error) return { error: DEFAULT_ERROR }

  const workouts = data?.workouts || workoutsRdx || null

  return { workouts }
}

export default useGetMyWorkouts
