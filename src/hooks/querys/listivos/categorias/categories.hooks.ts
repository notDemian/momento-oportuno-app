import { useQuery } from 'react-query'

import { CategoriasQuerys } from './categories.keys'

import { CategoriesServices } from '@src/api'

const useCategorias = () => {
  return useQuery({
    queryKey: CategoriasQuerys.getAllCategorias,
    queryFn: CategoriesServices.getAllCategorias,
  })
}

const useCategoriaAttributes = (categoryId: number) => {
  return useQuery({
    queryFn: () => CategoriesServices.getCategoryAttributes(categoryId),
    queryKey: CategoriasQuerys.getCategoryAttributes(categoryId),
  })
}

export { useCategoriaAttributes, useCategorias }
