import { useEffect } from 'react';
import { storeWorkouts } from '../../model/services/redux/reduxApi/features/workouts/workoutsSlice'
import { storeSessions } from '../../model/services/redux/reduxApi/features/sessions/sessionsSlice'
import { useAppSelector, useAppDispatch } from '../../model/services/redux/reduxApi/app/hooks'
import WORKOUTS from '../../queries/workouts/getWorkouts'
import SESSIONS from '../../queries/sessions/getSessions'
import { selectAllWorkouts } from '../../model/services/redux/reduxApi/features/workouts/workoutsSlice'
import { selectAllSessions } from '../../model/services/redux/reduxApi/features/sessions/sessionsSlice'
import { selectLoginTokenInRdx } from '../../model/services/redux/reduxApi/features/auth/authSlice';
import { useQuery } from '@apollo/client';

// Initializes app data on login or page refresh
// Fetches workouts and sessions data from graphql and stores in redux
function useInitData() {
  const dispatch = useAppDispatch()
  const token: string = useAppSelector(selectLoginTokenInRdx)
  const workoutsRdx = useAppSelector(selectAllWorkouts)
  const sessionsRdx = useAppSelector(selectAllSessions)

  const {
    error: workoutsFetchErr,
    data: workoutsGql
  } = useQuery(WORKOUTS, {
    skip: !!workoutsRdx.length || !token,
    variables: { token }
  })

  const {
    error: sessionsFetchErr,
    data: sessionsGql
  } = useQuery(SESSIONS, {
    skip: !!sessionsRdx.length || !token,
    variables: { token }
  })

  const workouts = workoutsGql?.workouts || workoutsRdx
  const sessions = sessionsGql?.sessions || sessionsRdx
  const error = (
    workoutsFetchErr || sessionsFetchErr
    ? 'There was an error fetching your data'
    : null
  )

  useEffect(() => {
    if (workouts) dispatch(storeWorkouts(workouts))
    if (sessions) dispatch(storeSessions(sessions))
  })

  return {
    dataFetchSuccess: workouts.length && sessions.length,
    workouts: workouts,
    sessions: sessions,
    dataFetchError: error
  }
}

export default useInitData