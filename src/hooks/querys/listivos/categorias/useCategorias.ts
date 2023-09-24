import { useQuery } from 'react-query'

import { CategoriasQuerys } from './categorias.querys'

import { CategoriasServices } from '@src/api'
import { AxiosError } from 'axios'

const useCategorias = (parent?: number) => {
  return useQuery({
    queryKey: [CategoriasQuerys.getAllCategorias, parent],
    queryFn: () => CategoriasServices.getCategoriasByParent(parent),
    onError(error: AxiosError) {
      console.log(error.response?.data)
    },
  })
}

export { useCategorias }
