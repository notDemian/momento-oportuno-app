/* eslint-disable @typescript-eslint/no-unused-vars */
import { Slices } from '../store.helper'

import { FilterState } from './filter.type'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: FilterState = {}

export const filterSlice = createSlice({
  name: Slices.Filter,
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<FilterState['category']>) {
      state.category = action.payload
    },
    setSubcategory(state, action: PayloadAction<FilterState['subCategory']>) {
      state.subCategory = action.payload
    },
    setFilterParams(state, action: PayloadAction<FilterState>) {
      state.category = action.payload.category
      state.subCategory = action.payload.subCategory
      state.priceMin = action.payload.priceMin
      state.priceMin = action.payload.priceMin
      state.state = action.payload.state
    },
    setState(state, action: PayloadAction<FilterState['state']>) {
      state.state = action.payload
    },

    resetFilter(state) {
      state.category = undefined
      state.priceMax = undefined
      state.priceMin = undefined
      state.query = undefined
      state.state = undefined
      state.subCategory = undefined
    },
  },
})

export const {
  resetFilter,
  setCategory,
  setFilterParams,
  setSubcategory,
  setState,
} = filterSlice.actions
export default filterSlice.reducer
