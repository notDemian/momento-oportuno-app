import { useQuery } from 'react-query'

import { EstadosQuerys } from './estados.keys'

import { StatesServices } from '@src/api'

const useEstados = () => {
  return useQuery({
    queryKey: EstadosQuerys.getAllEstados,
    queryFn: StatesServices.getAllEstados,
  })
}

export { useEstados }
