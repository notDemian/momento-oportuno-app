import { useInfiniteQuery } from 'react-query'

import { AnunciosQuerys } from './anuncios.query'

import AnunciosServices from '@src/api/Anuncios/Anuncios'
import { mapAnuncio } from '@src/utils'

const useAnuncios = () => {
  return useInfiniteQuery({
    queryKey: [AnunciosQuerys.getAllAnuncios],
    queryFn: ({ pageParam = 1 }) =>
      AnunciosServices.getAllAnuncios({ page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.length < 12) return undefined
      return lastPage.nextPage
    },
    select(data) {
      // return data
      const newData = {
        ...data,
        pages: data.pages.map((page) => ({
          ...page,
          data: page.data.map(mapAnuncio),
        })),
      }
      return newData
    },
  })
}

export { useAnuncios }
