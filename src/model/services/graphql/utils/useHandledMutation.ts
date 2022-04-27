import { useMutation } from '@apollo/client'
import DEFAULT_ERROR from '../../../../utils/defaultError'
import store from '../../redux/reduxApi/app/store'
import {
  storeErrorMessage,
  removeErrorMessage
} from '../../redux/reduxApi/features/errors/errorsSlice'


function useHandledMutation(mutationString: any) {
  const [mutation] = useMutation(mutationString)

  return async function (...args: any[]) {
    try {
      const response = await mutation(...args)

      const mutationName = Object.keys(response.data)[0]

      // catches serverside errors on mutation
      // addresses bug in Apollo where mutation errors not caught
      // https://github.com/apollographql/apollo-client/issues/5708
      if (response.data[mutationName] === null) {
        store.dispatch(storeErrorMessage(DEFAULT_ERROR))
        return { error: DEFAULT_ERROR }

      } else {
        store.dispatch(removeErrorMessage())
        return response.data[mutationName]

      }


    } catch (err) {
      store.dispatch(storeErrorMessage(DEFAULT_ERROR))
      return { error: DEFAULT_ERROR }
    }
  }
}

export default useHandledMutation