import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

interface State {
  loginToken: string
}

const initialState: State = {
  loginToken: ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    storeLoginTokenInRdx(state, action: PayloadAction<string>) {
      state.loginToken = action.payload
    },

    removeLoginTokenInRdx(state) {
      state.loginToken = ''
    }
  }
})

export const selectLoginTokenInRdx = (state: RootState) => state.auth.loginToken

export const {
  storeLoginTokenInRdx,
  removeLoginTokenInRdx
} = authSlice.actions

export default authSlice.reducer
