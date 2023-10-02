export type FilterParamsBase = {
  state: number
  query: string
  category: number
  subCategory?: number
  priceMin?: number
  priceMax?: number
}

export type FilterParams = Partial<FilterParamsBase>

export type FilterState = FilterParams
