import { useMutation, useQueryClient } from 'react-query'

import { DirectoriosQuerys } from './directorios.query'

import { DirectorioServices } from '@src/api'

export const useDirectorio = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationKey: [DirectoriosQuerys.getDirectorio],
    mutationFn: (id: number) => DirectorioServices.getDirectorioById(id),
    onSuccess: () => {
      qc.invalidateQueries(DirectoriosQuerys.getAllDirectorios)
    },
  })
}
