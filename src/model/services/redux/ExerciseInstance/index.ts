import { useAppDispatch } from '../reduxApi/app/hooks'
import { incrementSetForExInst } from '../reduxApi/features/sessions/sessionsSlice'

const ExerciseInstance = {
  useIncrementSet() {
    const dispatch = useAppDispatch()

    function incrementSet(exInstId: string, sessionId: string) {
      dispatch(incrementSetForExInst({
        exInstId: exInstId,
        sessionId: sessionId
      }))
    }

    return incrementSet
  }
}

export default ExerciseInstance
