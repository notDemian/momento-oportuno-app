import { useQuery, useQueryClient } from 'react-query'

import { UsersQuerys } from './users.query'

import UserServices from '@src/api/Usuarios/Usuarios'
import { useAppSelector } from '@src/hooks/useAppRedux'

export const useFavorites = () => {
  const favorites = useAppSelector((s) => s.cart.favorites) ?? []

  return useQuery({
    queryKey: [UsersQuerys.getFavorites],
    queryFn: UserServices.getFavorites,
    initialData: favorites,
    select: (data) => [...new Set([...data, ...favorites])],
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
