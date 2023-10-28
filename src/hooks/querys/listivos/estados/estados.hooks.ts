import { useQuery } from 'react-query'

import { EstadosQuerys } from './estados.keys'

import { StatesServices } from '@src/api'
import { Constants } from '@src/utils'

const useEstados = (ignoreAllState = true) => {
  return useQuery({
    queryKey: EstadosQuerys.getAllEstados,
    queryFn: StatesServices.getAllEstados,
    select(data) {
      return {
        ...data,
        data: ignoreAllState
          ? data.data.filter((item) => item.id !== Constants.IDS.allStates)
          : data.data,
      }
    },
  })
}

export { useEstados }
