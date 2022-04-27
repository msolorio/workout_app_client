import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

interface ErrorStateType {
  errorMessage: string
}

const initialState: ErrorStateType = {
  errorMessage: ''
}


const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    storeErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload
    },

    removeErrorMessage(state) {
      state.errorMessage = ''
    }
  }
})

export const selectErrorMessage = (state: RootState) => state.errors.errorMessage

export const {
  storeErrorMessage,
  removeErrorMessage
} = errorsSlice.actions

export default errorsSlice.reducer
