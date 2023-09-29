import { useQuery } from 'react-query'

import { CategoriasQuerys } from './categorias.querys'

import { CategoriasServices } from '@src/api'

const useCategorias = (parent?: number) => {
  return useQuery({
    queryKey: [CategoriasQuerys.getAllCategorias, parent],
    queryFn: () => CategoriasServices.getCategoriasByParent(parent),
  })
}

export { useCategorias }
