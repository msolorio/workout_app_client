import { useEffect } from 'react'
import rdx from '../../services/redux'
import gql from '../../services/graphql'
import { WorkoutType, SessionType } from '../../Types'
import { useAppSelector } from '../../services/redux/reduxApi/app/hooks'
import { selectLoginStatusRdx } from '../../services/redux/reduxApi/features/auth/authSlice';

interface UseInitDataResType {
  workouts: WorkoutType[] | null
  sessions: SessionType[] | null
}

const App = {
  // Sets user's workouts and sessions in redux
  useInitData(): UseInitDataResType {
    const workouts = gql.Workout.useGetMyWorkouts()
    const sessions = gql.Session.useGetMySessions()
    const loggedInStatus = useAppSelector(selectLoginStatusRdx)
    
    const storeWorkoutsRdx = rdx.Workout.useStoreWorkouts()
    const storeSessionsRdx = rdx.Session.useStoreSessions()
    
    
    useEffect(() => {
      if (workouts && sessions && loggedInStatus) {        
        storeWorkoutsRdx(workouts)
        storeSessionsRdx(sessions)
      }
    })

    return {
      workouts,
      sessions
    }
  },

  
  // Syncs token in redux with token in httpOnly cookie
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
    const logoutUserGql = gql.User.useLogoutUser()
    const logoutUserRdx = rdx.User.useLogoutUser()

    return async function resetData() {
      logoutUserRdx()
      await logoutUserGql()
      await resetDataGql()

      window.location.reload()
    }
  },

  useGetErrorMessage(): string {
    return rdx.App.useGetErrorMessage()
  },

  useSetErrorMessage() {
    const setErrorMsgRdx = rdx.App.useSetErrorMessage()

    return function setErrorMessage(error?: string) {
      setErrorMsgRdx(error)
    }
  },

  useRemoveErrorMessage() {
    const removeErrorMsgRdx = rdx.App.useRemoveErrorMessage()

    return function removeErrorMessage() {
      removeErrorMsgRdx()
    }
  }
}

export default App
