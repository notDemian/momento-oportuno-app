import React from 'react'

import { FilterContext } from './filter'
import {
  FilterAction,
  FilterProviderProps,
  FilterState,
} from './FilterProvider.type'
// import { palette } from '@src/theme/theme-palette'

const initialFilterState: FilterState = {
  minPrice: 0,
  maxPrice: 0,
  sizes: [],
  // capacity: 0,
  // color: palette.white,
  // maxSize: 0,
  // minSize: 0,
  // state: '',
  // type: '',
}

const FilterReducer = (
  state: FilterState,
  action: FilterAction,
): FilterState => {
  switch (action.type) {
    case 'SET_MAX_PRICE':
      return {
        ...state,
        maxPrice: action.payload,
      }
    case 'SET_MIN_PRICE':
      return {
        ...state,
        minPrice: action.payload,
      }

    case 'ADD_SIZE':
      return {
        ...state,
        sizes: [...state.sizes, action.payload],
      }
    case 'SET_SIZES':
      return {
        ...state,
        sizes: action.payload,
      }

    case 'TOGGLE_SIZE':
      return {
        ...state,
        sizes: state.sizes.includes(action.payload)
          ? state.sizes.filter((size) => size !== action.payload)
          : [...state.sizes, action.payload],
      }

    case 'RESET_FILTER':
      return {
        ...initialFilterState,
      }

    default:
      return state
  }
}

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [state, dispatch] = React.useReducer(FilterReducer, initialFilterState)
  const { minPrice, maxPrice, sizes } = state

  const filterContext: Parameters<typeof FilterContext.Provider>[0]['value'] =
    React.useMemo(
      () => ({
        minPrice,
        maxPrice,
        sizes,
        setMaxPrice(maxPrice) {
          dispatch({ type: 'SET_MAX_PRICE', payload: maxPrice })
        },
        setMinPrice(minPrice) {
          dispatch({ type: 'SET_MIN_PRICE', payload: minPrice })
        },
        setSizes(sizes) {
          dispatch({ type: 'SET_SIZES', payload: sizes })
        },
        addSize(size) {
          dispatch({ type: 'ADD_SIZE', payload: size })
        },
        toggleSize(size) {
          dispatch({ type: 'TOGGLE_SIZE', payload: size })
        },
      }),
      [minPrice, maxPrice, sizes],
    )

  return (
    <FilterContext.Provider value={filterContext}>
      {children}
    </FilterContext.Provider>
  )
}
