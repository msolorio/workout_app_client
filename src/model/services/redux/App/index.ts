import { useAppSelector } from '../reduxApi/app/hooks'
import { selectErrorMessage } from '../reduxApi/features/errors/errorsSlice'


const App = {
  useSyncToken() {
    // TODO: Check for presence of httpOnly cookie - token
    // If one exists then set loginStatus to true in redux
  },

  useGetErrorMessage(): string {
    return useAppSelector(selectErrorMessage)
  }
}

export default App