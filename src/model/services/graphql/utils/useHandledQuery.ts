import { useQuery } from '@apollo/client';
import DEFAULT_ERROR from '../../../../utils/defaultError'
import store from '../../redux/reduxApi/app/store'
import {
  storeErrorMessage,
  removeErrorMessage
} from '../../redux/reduxApi/features/errors/errorsSlice'
import { GqlString } from '../../../Types'

interface QueryArgs {
  skip: boolean,
  variables: object
}

function useHandledQuery(queryString: GqlString, argsObj: QueryArgs) {
  const response = useQuery(queryString, argsObj)
  
  if (response.error) {
    store.dispatch(storeErrorMessage(DEFAULT_ERROR))
    return { error: DEFAULT_ERROR }
  }
  
  if (response.data) {
    store.dispatch(removeErrorMessage())
    return response.data
  }

  return {}
}

export default useHandledQuery
