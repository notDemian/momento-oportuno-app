import { useMutation, useQuery, useQueryClient } from 'react-query'

import { FavoritesMutationsKeys, FavoritesQuerysKeys } from './favorites.keys'

import { FavoritesServices, GetMyFavoritesResponse } from '@src/api'

export const useAddFavorite = () => {
  const qC = useQueryClient()

  return useMutation({
    mutationKey: FavoritesMutationsKeys.addFavorite,
    mutationFn: FavoritesServices.addFavorite,
    onSettled: () => {
      qC.invalidateQueries(FavoritesQuerysKeys.getMyFavorites)
    },
  })
}

export const useRemoveFavorite = () => {
  const qC = useQueryClient()

  return useMutation({
    mutationKey: FavoritesMutationsKeys.removeFavorite,
    mutationFn: FavoritesServices.removeFavorite,
    onSettled: () => {
      qC.invalidateQueries(FavoritesQuerysKeys.getMyFavorites)
    },
  })
}
export const useMyFavorites = () => {
  return useQuery<GetMyFavoritesResponse>({
    queryKey: FavoritesQuerysKeys.getMyFavorites,
    queryFn: FavoritesServices.getMyFavorites,
  })
}
