import { useMutation } from '@apollo/client'
import DEFAULT_ERROR from '../../../../utils/defaultError'
import store from '../../redux/reduxApi/app/store'
import {
  storeErrorMessage,
  removeErrorMessage
} from '../../redux/reduxApi/features/errors/errorsSlice'
import { GqlString } from '../../../Types'

// catches serverside errors on mutation
// addresses bug in Apollo where mutation errors not caught
// https://github.com/apollographql/apollo-client/issues/5708
function useHandledMutation(mutationString: GqlString) {
  const [mutation] = useMutation(mutationString)

  return async function (argsObj?: { variables: object }) {
    try {
      const response = await mutation(argsObj)

      const mutationName = Object.keys(response.data)[0]

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