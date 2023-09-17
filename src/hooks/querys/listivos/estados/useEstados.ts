import { useQuery } from 'react-query'

import { EstadosQuerys } from './estados.querys'

import { EstadosServices } from '@src/api'
import { AxiosError } from 'axios'

const useEstados = () => {
  return useQuery({
    queryKey: [EstadosQuerys.getAllEstados],
    queryFn: () => EstadosServices.getAllEstados(),
    onError(err: AxiosError) {
      console.log(err.response?.data)
    },
  })
}

export { useEstados }
