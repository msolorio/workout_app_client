import { useEffect } from 'react'
import rdx from '../../services/redux'
import gql from '../../services/graphql'
import { removeLoginTokenInLocalStorage } from '../../../utils/authUtils'
import { WorkoutType, SessionType } from '../../Types'

interface UseInitDataResType {
  dataFetchSuccess: boolean
  workouts: WorkoutType[]
  sessions: SessionType[]
}

const App = {
  // Sets user's workouts and sessions in redux
  useInitData(): UseInitDataResType {
    const workouts = gql.Workout.useGetMyWorkouts()
    const sessions = gql.Session.useGetMySessions()

    const storeWorkoutsRdx = rdx.Workout.useStoreWorkouts()
    const storeSessionsRdx = rdx.Session.useStoreSessions()


    useEffect(() => {
      storeWorkoutsRdx(workouts)
      storeSessionsRdx(sessions)
    })

    return {
      dataFetchSuccess: !!workouts && !!sessions,
      workouts,
      sessions
    }
  },

  
  // Syncs token in redux with token in browser storage
  useSyncToken() {
    rdx.App.useSyncToken()
  },


  // Temporary fix for this react bug - https://stackoverflow.com/questions/70368760/react-uncaught-referenceerror-process-is-not-defined/70791920#70791920
  useSetWindowProcess() {
    useEffect(() => {    
      // @ts-ignore
      window.process = { ...window.process, }
    })
  },


  useGetLoginStatus(): boolean {
    return rdx.User.useGetLoginStatus()
  },


  useResetData() {
    const resetDataGql = gql.App.useResetData()
    const logoutUserRdx = rdx.User.useLogoutUser()

    return async function resetData() {
      removeLoginTokenInLocalStorage()
      logoutUserRdx()
      await resetDataGql()
    }
  },

  useGetErrorMessage(): string {
    return rdx.App.useGetErrorMessage()
  }
}

export default App
