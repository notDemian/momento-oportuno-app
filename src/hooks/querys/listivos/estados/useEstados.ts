import { useQuery } from 'react-query'

import { EstadosQuerys } from './estados.querys'

import { EstadosServices } from '@src/api'

const useEstados = () => {
  return useQuery({
    queryKey: [EstadosQuerys.getAllEstados],
    queryFn: () => EstadosServices.getAllEstados(),
  })
}

export { useEstados }
