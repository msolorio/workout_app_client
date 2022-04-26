import { useEffect } from 'react'
import rdx from '../../services/redux'
import gql from '../../services/graphql'

const App = {
  // Sets user's workouts and sessions in redux
  useInitData() {
    const workouts = gql.Workout.useGetMyWorkouts()
    const sessions = gql.Session.useGetMySessions()

    const storeWorkouts = rdx.Workout.useStoreWorkouts()
    const storeSessions = rdx.Session.useStoreSessions()
    
    useEffect(() => {
      if (workouts) storeWorkouts(workouts)
      if (sessions) storeSessions(sessions)
    })

    return {
      dataFetchSuccess: workouts.length && sessions.length,
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
  }
}

export default App
