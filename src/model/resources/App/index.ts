import { useEffect } from 'react'
import rdx from '../../services/redux'
import gql from '../../services/graphql'
import { removeLoginTokenInLocalStorage } from '../../../utils/authUtils'

const App = {
  useInitData() {
    const { workouts, error: workoutsError } = gql.Workout.useGetMyWorkouts()
    const { sessions, error: sessionsError } = gql.Session.useGetMySessions()

    const storeWorkoutsRdx = rdx.Workout.useStoreWorkouts()
    const storeSessionsRdx = rdx.Session.useStoreSessions()


    useEffect(() => {
      if (workouts) storeWorkoutsRdx(workouts)
      if (sessions) storeSessionsRdx(sessions)
    })

    return {
      dataFetchSuccess: !workoutsError,
      error: workoutsError || sessionsError,
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


  useGetLoginToken() {
    return rdx.App.useGetLoginToken()
  },


  useResetData() {
    const resetDataGql = gql.App.useResetData()
    const logoutUserRdx = rdx.User.useLogoutUser()

    return async function resetData() {
      removeLoginTokenInLocalStorage()
      logoutUserRdx()
      await resetDataGql()
    }
  }
}

export default App
