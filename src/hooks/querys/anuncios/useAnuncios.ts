import { useInfiniteQuery } from 'react-query'

import { AnunciosQuerys } from './anuncios.query'

import AnunciosServices from '@src/api/Anuncios/Anuncios'

const useAnuncios = () => {
  return useInfiniteQuery({
    queryKey: [AnunciosQuerys.getAllAnuncios],
    queryFn: ({ pageParam = 1 }) =>
      AnunciosServices.getAllAnuncios({ page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.length < 12) return undefined
      return lastPage.nextPage
    },
  })
}

export { useAnuncios }
