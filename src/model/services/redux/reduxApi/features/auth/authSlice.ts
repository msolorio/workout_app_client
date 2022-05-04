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

    logoutUserRdxInRdx(state) {
      state.loginStatus = false
    }
  }
})

export const selectLoginStatusRdx = (state: RootState) => state.auth.loginStatus

export const {
  loginUserRdx,
  logoutUserRdxInRdx
} = authSlice.actions

export default authSlice.reducer
