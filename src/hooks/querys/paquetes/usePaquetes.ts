import { PaquetesServices } from '@src/api'
import { useInfiniteQuery } from 'react-query'
import { PaquetesQuerys } from './paquetes.query'

const usePaquetes = () => {
  return useInfiniteQuery({
    queryKey: [PaquetesQuerys.getAllPaquetes],
    queryFn: ({ pageParam = 1 }) =>
      PaquetesServices.getAllPaquetes({ page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.length < 12) return undefined
      return lastPage.nextPage
    },
  })
}

export { usePaquetes }
