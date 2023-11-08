import { palette } from '@src/theme/theme-palette'

export const FilterSizes = ['xs', 's', 'm', 'l', 'xl'] as const
export type FilterSize = (typeof FilterSizes)[number]

export const FilterStyles = [
  palette.acentoCereza,
  palette.blue,
  palette.azulAmistoso,
  palette.google,
  palette.facebook,
] as const
export type FilterStyle = (typeof FilterStyles)[number]

export const FilterCategories = [
  'Categoría 1',
  'Categoría 2',
  'Categoría 3',
  'Categoría 4',
  'Categoría 5',
  'Categoría 6',
] as const
export type FilterCategory = (typeof FilterCategories)[number]
