import { useInfiniteQuery } from 'react-query'

import { AnunciosQuerys } from './anuncios.query'

import AnunciosServices from '@src/api/Anuncios/Anuncios'
import { FilterParams } from '@src/redux/filter'
import { mapAnuncio } from '@src/utils'

type useAnunciosProps = FilterParams

const useAnuncios = (params?: useAnunciosProps) => {
  return useInfiniteQuery({
    queryKey: [AnunciosQuerys.getAllAnuncios, params],
    queryFn: ({ pageParam = 1 }) =>
      AnunciosServices.getAllAnuncios({ page: pageParam, ...params }),
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
          // ).sort((a, b) => b.fullData.is_featured )
          // some ads have an is_featured boolean value, sort the array so these comes first if true and last if false
          data: page.data.map(mapAnuncio).sort((a, b) => {
            if (a.fullData.is_featured && !b.fullData.is_featured) return -1
            if (!a.fullData.is_featured && b.fullData.is_featured) return 1
            return 0
          }),
        })),
      }
      return newData
    },
  })
}

export { useAnuncios }
