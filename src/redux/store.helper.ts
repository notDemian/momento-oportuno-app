export const Slices = {
  Test: 'test',
  Auth: 'auth',
  Cart: 'cart',
  Filter: 'filter',
} as const

export const AllSlices = Object.values(Slices)

export type Slice = (typeof AllSlices)[number]
export type SlicesReducers = {
  [key in Slice]: any
}
