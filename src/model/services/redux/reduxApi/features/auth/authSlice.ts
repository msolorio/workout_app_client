import {
  createSlice,
  // PayloadAction
} from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

interface State {
  loginStatus: boolean
}

const initialState: State = {
  loginStatus: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUserRdx(state) {
      state.loginStatus = true
    },

    removeLoginTokenInRdx(state) {
      state.loginStatus = false
    }
  }
})

export const selectLoginTokenInRdx = (state: RootState) => state.auth.loginStatus

export const {
  loginUserRdx,
  removeLoginTokenInRdx
} = authSlice.actions

export default authSlice.reducer
