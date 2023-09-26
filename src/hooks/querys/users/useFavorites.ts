import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query'
import { GetFavoritesResponse } from '../../../api/Usuarios/Usuarios.type'

import { UsersQuerys } from './users.query'

import UserServices from '@src/api/Usuarios/Usuarios'

export const useFavorites = <T extends boolean = false>(
  selectAll?: T,
): UseQueryResult<
  T extends true ? GetFavoritesResponse : number[],
  unknown
> => {
  return useQuery(UsersQuerys.getFavorites, UserServices.getFavorites, {
    select: (data) => {
      if (selectAll) {
        return data
      }
      console.log('fetching')

      return data.map((item) => item.ID)
    },
  })
}

export const useAddFavorite = (id: number) => {
  const queryCLient = useQueryClient()

  return useQuery({
    queryKey: [UsersQuerys.addFavorite, id],
    queryFn: () => UserServices.addFavorite(id),
    onSuccess: () => {
      queryCLient.invalidateQueries(UsersQuerys.getFavorites)
    },
  })
}

export const useRemoveFavorite = (id: number) => {
  const queryCLient = useQueryClient()

  return useQuery({
    queryKey: [UsersQuerys.removeFavorite, id],
    queryFn: () => UserServices.removeFavorite(id),
    onSuccess: () => {
      queryCLient.invalidateQueries(UsersQuerys.getFavorites)
    },
  })
}

export const useToggleFavorite = (id: number) => {
  const queryCLient = useQueryClient()

  return useMutation({
    mutationKey: [UsersQuerys.toggleFavorite, id],
    mutationFn: () => UserServices.toggleFavorite(id),
    onSuccess: () => {
      queryCLient.invalidateQueries(UsersQuerys.getFavorites)
    },
  })
}
