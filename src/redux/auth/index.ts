export * from './auth'
export { default as LogOutAction } from './auth'
import { Alert } from 'react-native'
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Slices } from '../store.helper'

import { AuthState, JwtUserSchema } from './auth.type'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import jwt from 'jwt-decode'

const initialState: AuthState = {
  token: '',
  user: null,
  userId: -1,
}

export const authSlice = createSlice({
  name: Slices.Auth,
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<NonNullable<AuthState['user']>>) => {
      const jwtDecoded = jwt(action.payload.token)
      const jwtParsed = JwtUserSchema.safeParse(jwtDecoded)
      if (!jwtParsed.success) {
        Alert.alert('Error', 'Error al decodificar el token')
        return
      }
      state.user = action.payload
      state.token = action.payload.token
      state.userId = jwtParsed.data.data.user.id
    },

    resetAuth: (state) => {
      state = initialState
    },
  },
})

export const { resetAuth, setUser } = authSlice.actions
export default authSlice.reducer
