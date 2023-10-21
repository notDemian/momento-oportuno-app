import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query'

import { UsersQuerys } from './users.query'

import UserServices from '@src/api/Usuarios/Usuarios'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppRedux'
import { toggleFavorite } from '@src/redux'

export const useFavorites = <T extends boolean = false>(
  selectAll?: T,
): UseQueryResult<
  T extends true ? GetFavoritesResponse : number[],
  unknown
> => {
  const favorites = useAppSelector((p) => p.cart.favorites) ?? []

  return useQuery(UsersQuerys.getFavorites, UserServices.getFavorites, {
    select: (data) => {
      if (selectAll) {
        return data
      }

      return [...new Set([...data.map((item) => item.ID), ...favorites])]
    },
  })
}

// export const useAddFavorite = (id: number) => {
//   const queryCLient = useQueryClient()

//   const dispatch = useAppDispatch()

//   return useQuery({
//     queryKey: [UsersQuerys.addFavorite, id],
//     queryFn: () => UserServices.addFavorite(id),
//     onSuccess: () => {
//       queryCLient.invalidateQueries(UsersQuerys.getFavorites)
//       dispatch(toggleFavorite(id))
//     },
//   })
// }

// export const useRemoveFavorite = (id: number) => {
//   const queryCLient = useQueryClient()

//   return useQuery({
//     queryKey: [UsersQuerys.removeFavorite, id],
//     queryFn: () => UserServices.removeFavorite(id),
//     onSuccess: () => {
//       queryCLient.invalidateQueries(UsersQuerys.getFavorites)
//     },
//   })
// }

// export const useToggleFavorite = (id: number) => {
//   const queryCLient = useQueryClient()
//   const dispatch = useAppDispatch()

//   return useMutation({
//     mutationKey: [UsersQuerys.toggleFavorite, id],
//     mutationFn: () => UserServices.toggleFavorite(id),
//     onSuccess: () => {
//       queryCLient.invalidateQueries(UsersQuerys.getFavorites)
//       dispatch(toggleFavorite(id))
//     },
//   })
// }
