import { useAppSelector } from '../reduxApi/app/hooks'
import store from '../../redux/reduxApi/app/store'
import DEFAULT_ERROR from '../../../../utils/defaultError'
import {
  selectErrorMessage,
  storeErrorMessage,
  removeErrorMessage
} from '../reduxApi/features/errors/errorsSlice'


const App = {
  useSyncToken() {
    // TODO: Check for presence of httpOnly cookie - token
    // If one exists then set loginStatus to true in redux
    // allows us to remain logged in on page refresh
  },

  useGetErrorMessage(): string {
    return useAppSelector(selectErrorMessage)
  },

  useSetErrorMessage() {
    return function setErrorMessage(error: string=DEFAULT_ERROR) {
      store.dispatch(storeErrorMessage(error))
    }
  },

  useRemoveErrorMessage() {
    return function removeErrorMsg() {
      store.dispatch(removeErrorMessage())
    }
  }
}

export default App