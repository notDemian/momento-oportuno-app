import { useInfiniteQuery } from 'react-query'

import { AnunciosQuerys } from './anuncios.query'

import AnunciosServices from '@src/api/Anuncios/Anuncios'
import { mapAnuncio } from '@src/utils'

const useAnunciosByState = ({ state }: { state: string | number }) => {
  const hook = useInfiniteQuery({
    queryKey: [AnunciosQuerys.getAnunciosByState, state],
    queryFn: ({ pageParam = 1 }) =>
      AnunciosServices.getAllAnunciosByState({ page: pageParam, state }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.length < 12) return undefined
      return lastPage.nextPage
    },
    select(data) {
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
  return hook
}

export { useAnunciosByState }
