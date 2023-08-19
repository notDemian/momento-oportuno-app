/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TestState } from './test.type'
import { Slices } from '../store.helper'

const initialState: TestState = {
  token: '',
  count: 0,
}

export const testSlice = createSlice({
  name: Slices.Test,
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload
    },
    incrementCount: (state) => {
      state.count += 1
    },
    decrementCount: (state) => {
      state.count -= 1
    },

    resetTest: (state) => {
      state = initialState
    },
  },
})

export const { resetTest, decrementCount, incrementCount, setCount, setToken } =
  testSlice.actions
export default testSlice.reducer
