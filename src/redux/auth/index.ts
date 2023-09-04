export * from './auth'
export { default as LogOutAction } from './auth'

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Slices } from '../store.helper'

import { AuthState } from './auth.type'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: AuthState = {
  token: '',
  user: null,
}

export const authSlice = createSlice({
  name: Slices.Auth,
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<NonNullable<AuthState['user']>>) => {
      state.token = action.payload.token
      state.user = action.payload
    },
    resetAuth: (state) => {
      state = initialState
    },
  },
})

export const { resetAuth, setUser } = authSlice.actions
export default authSlice.reducer
