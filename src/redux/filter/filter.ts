/* eslint-disable @typescript-eslint/no-unused-vars */
import { Slices } from '../store.helper'

import { FilterState } from './filter.type'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: FilterState = {
  category: '',
  query: '',
  state: '',
}

export const filterSlice = createSlice({
  name: Slices.Filter,
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<FilterState['category']>) {
      state.category = action.payload
    },
    resetCart(state) {
      state = initialState
    },
  },
})

export const { resetCart, setCategory } = filterSlice.actions
export default filterSlice.reducer
