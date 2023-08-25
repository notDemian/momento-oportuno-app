import AnunciosServices from '@src/api/Anuncios/Anuncios'
import { useInfiniteQuery } from 'react-query'
import { AnunciosQuerys } from './anuncios.query'

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
