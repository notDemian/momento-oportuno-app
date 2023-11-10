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
    async onMutate(newTodoId) {
      await qC.cancelQueries(FavoritesQuerysKeys.getMyFavorites)

      const previousTodos = qC.getQueryData<GetMyFavoritesResponse>(
        FavoritesQuerysKeys.getMyFavorites,
      )

      //@ts-ignore doesnt matter if its uncomplete because we only use the id, and then the data is fetched again
      const newTodo: GetMyFavoritesResponse['data'][number] = {
        id: newTodoId,
      }

      if (previousTodos && newTodo) {
        qC.setQueryData<GetMyFavoritesResponse>(
          FavoritesQuerysKeys.getMyFavorites,
          {
            ...previousTodos,
            data: [...previousTodos.data, newTodo],
          },
        )

        return { previousTodos }
      }
    },
    onError(err, newTodo, context) {
      if (context?.previousTodos) {
        qC.setQueryData<GetMyFavoritesResponse>(
          FavoritesQuerysKeys.getMyFavorites,
          context.previousTodos,
        )
      }
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
    async onMutate(newTodoId) {
      await qC.cancelQueries(FavoritesQuerysKeys.getMyFavorites)

      const previousTodos = qC.getQueryData<GetMyFavoritesResponse>(
        FavoritesQuerysKeys.getMyFavorites,
      )

      const newTodos = previousTodos?.data.filter(
        (item) => item.id !== newTodoId,
      )

      if (previousTodos && newTodos) {
        qC.setQueryData<GetMyFavoritesResponse>(
          FavoritesQuerysKeys.getMyFavorites,
          {
            ...previousTodos,
            data: [...newTodos],
          },
        )

        return { previousTodos }
      }
    },
    onError(err, newTodo, context) {
      if (context?.previousTodos) {
        qC.setQueryData<GetMyFavoritesResponse>(
          FavoritesQuerysKeys.getMyFavorites,
          context.previousTodos,
        )
      }
    },
  })
}

type UseMyFavoritesProps = {
  enabled?: boolean
}

export const useMyFavorites = (props?: UseMyFavoritesProps) => {
  const { enabled = true } = props || {}

  return useQuery<GetMyFavoritesResponse>({
    queryKey: FavoritesQuerysKeys.getMyFavorites,
    queryFn: FavoritesServices.getMyFavorites,
    enabled,
  })
}
