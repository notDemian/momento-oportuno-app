import { useMutation, useQueryClient } from 'react-query'

import { DirectoriosQuerys } from './directorios.query'

import { DirectorioServices } from '@src/api'

export const useCreateDirectorio = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [DirectoriosQuerys.createDirectorio],
    mutationFn: DirectorioServices.createDirectorio,
    onSuccess: () => {
      queryClient.invalidateQueries(DirectoriosQuerys.getAllDirectorios)
    },
  })
}
