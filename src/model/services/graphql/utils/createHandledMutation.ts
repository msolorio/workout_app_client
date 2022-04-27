import { DEFAULT_ERROR } from '../../../../utils/defaultError'

function handleMutation(mutation: any) {

  return async function (...args: any[]) {
    try {
      const response = await mutation(...args)
      
      const mutationName = Object.keys(response.data)[0]
      
      if (response.data[mutationName] === null) {
        console.log('There was an error getting your data. Please try again later.')
        return { error: DEFAULT_ERROR }
      }
      
      else return response.data[mutationName]

    } catch (err) {
      console.log('There was an error getting your data. Please try again later.')
      return { error: DEFAULT_ERROR }
    }
  }
}

export default handleMutation