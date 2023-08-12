import { FilterSize } from '@src/screens/Filter/Filter.mock'

export type FilterProviderProps = {
  children?: React.ReactNode
}

export type FilterState = {
  minPrice: number
  maxPrice: number
  sizes: FilterSize[]

  // minSize: number
  // maxSize: number
  // state: string
  // type: string
  // capacity: number
  // color: string
}

export type FilterAction =
  | { type: 'SET_MIN_PRICE'; payload: number }
  | { type: 'SET_MAX_PRICE'; payload: number }
  | { type: 'SET_SIZES'; payload: FilterSize[] }
  | { type: 'ADD_SIZE'; payload: FilterSize }
  | { type: 'TOGGLE_SIZE'; payload: FilterSize }
  | { type: 'RESET_FILTER' }
// | { type: 'SET_MIN_SIZE'; payload: number }
// | { type: 'SET_MAX_SIZE'; payload: number }
// | { type: 'SET_STATE'; payload: string }
// | { type: 'SET_TYPE'; payload: string }
// | { type: 'SET_CAPACITY'; payload: number }
// | { type: 'SET_COLOR'; payload: string }
