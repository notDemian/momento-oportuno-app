import { useQuery } from 'react-query'

import { PaquetesQuerys } from './paquetes.query'

import { PaquetesServices } from '@src/api'

const useUserPaquetes = () => {
  return useQuery({
    queryKey: [PaquetesQuerys.getUserPaquetes],
    queryFn: PaquetesServices.getUserPaquetes,
    select(data) {
      return Array.isArray(data) ? data : Object.values(data).filter(Boolean)
    },
    cacheTime: 0,
    staleTime: 0,
  })
}

export { useUserPaquetes }
