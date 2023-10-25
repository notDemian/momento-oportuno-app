import { useInfiniteQuery, useMutation, useQuery } from 'react-query'

import { AnunciosQuerys } from './anuncios.keys'

import {
  AnunciosServices,
  CreateAnuncioParams,
  CreateAnuncioResponse,
  GetAdByIdResponse,
} from '@src/api'
import { QueryErrors } from '@src/api/request.type'
import { FilterParams } from '@src/redux'

export type useInfiniteAdsProps = FilterParams

const useAnuncios = (params?: useInfiniteAdsProps) => {
  return useInfiniteQuery({
    queryKey: AnunciosQuerys.getAllAnuncios(params),
    queryFn: ({ pageParam = 1 }) =>
      AnunciosServices.getAllAds({ page: pageParam, ...params }),
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.current_page === lastPage.meta.last_page) {
        return undefined
      }
      return lastPage.meta.current_page + 1
    },
    select(data) {
      const newData = {
        ...data,
        pages: data.pages.map((page) => ({
          ...page,
          data: page.data.sort((a, b) => {
            if (a.is_featured && !b.is_featured) return -1
            if (!a.is_featured && b.is_featured) return 1
            return 0
          }),
        })),
      }
      return newData
    },
  })
}

const useAnuncioByid = (id: string | number) => {
  return useQuery<GetAdByIdResponse, QueryErrors>({
    queryKey: AnunciosQuerys.getAnuncio(id),
    queryFn: () => AnunciosServices.getAd(id),
  })
}

const useMisAnuncios = () => {
  return useQuery({
    queryKey: AnunciosQuerys.getMyAds,
    queryFn: () => AnunciosServices.getMyAds(),
  })
}

const useCreateAnuncio = () => {
  return useMutation<CreateAnuncioResponse, QueryErrors, CreateAnuncioParams>({
    mutationKey: AnunciosQuerys.createAnuncio,
    mutationFn: AnunciosServices.createAd,
  })
}

export { useAnuncioByid, useAnuncios, useCreateAnuncio, useMisAnuncios }
