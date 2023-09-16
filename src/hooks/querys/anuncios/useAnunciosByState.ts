import { useInfiniteQuery } from 'react-query'

import { AnunciosQuerys } from './anuncios.query'

import AnunciosServices from '@src/api/Anuncios/Anuncios'

const useAnunciosByState = ({ state }: { state: string | number }) => {
  return useInfiniteQuery({
    queryKey: [AnunciosQuerys.getAnunciosByState],
    queryFn: ({ pageParam = 1 }) =>
      AnunciosServices.getAllAnunciosByState({ page: pageParam, state }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.length < 12) return undefined
      return lastPage.nextPage
    },
  })
}

export { useAnunciosByState }
