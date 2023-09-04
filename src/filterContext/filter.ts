/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'

import { FilterState } from './FilterProvider.type'

import { FilterSize } from '@src/screens/Filter/Filter.mock'

type ContextFilterState = FilterState & {
  setMinPrice: (minPrice: number) => void
  setMaxPrice: (maxPrice: number) => void
  setSizes: (sizes: FilterSize[]) => void
  addSize: (size: FilterSize) => void
  toggleSize: (size: FilterSize) => void
  // setMinSize: (minSize: number) => void
  // setMaxSize: (maxSize: number) => void
  // setState: (state: string) => void
  // setType: (type: string) => void
  // setCapacity: (capacity: number) => void
  // setColor: (color: string) => void
}

const initialAutthState: ContextFilterState = {
  minPrice: 0,
  maxPrice: 0,
  sizes: [],
  setMinPrice: (_) => {},
  setMaxPrice: (_) => {},
  setSizes: (_) => {},
  addSize: (_) => {},
  toggleSize: (_) => {},
}

export const FilterContext = React.createContext(initialAutthState)

export const useFilterContext = () => {
  const context = React.useContext(FilterContext)
  if (context === undefined) {
    throw new Error('useFilterContext must be used within a FilterProvider')
  }
  return context
}
