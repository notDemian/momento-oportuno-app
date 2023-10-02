export type FilterParamsBase = {
  state: string | number
  query: string | number
  category: string | number
  priceMin?: number
  priceMax?: number
}

export type FilterParams = Partial<FilterParamsBase>

export type FilterState = FilterParams
