import { PaquetesServices } from '@src/api'
import { useQuery } from 'react-query'
import { PaquetesQuerys } from './paquetes.query'

const usePaquetes = () => {
  return useQuery({
    queryKey: [PaquetesQuerys.getAllPaquetes],
    queryFn: (params) => PaquetesServices.getAllPaquetes(),
  })
}

export { usePaquetes }
