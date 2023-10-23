import { useMutation, useQuery, useQueryClient } from 'react-query'

import { DirectoriosQuerys } from './directorios.keys'

import { DirectorioServices } from '@src/api'

const useCreateDirectorio = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [DirectoriosQuerys.createDirectorio],
    mutationFn: DirectorioServices.createDirectorio,
    onSuccess: () => {
      queryClient.invalidateQueries(DirectoriosQuerys.getAllDirectorios)
    },
  })
}
const useDirectorioById = (id: number | undefined) => {
  const qc = useQueryClient()
  return useQuery({
    queryKey: DirectoriosQuerys.getDirectorioById(id),
    queryFn: () => DirectorioServices.getDirectorioById(id),
    onSuccess: () => {
      qc.invalidateQueries(DirectoriosQuerys.getAllDirectorios)
    },
  })
}
const useDirectorios = () => {
  return useQuery({
    queryKey: [DirectoriosQuerys.getAllDirectorios],
    queryFn: DirectorioServices.getAllDirectorio,
  })
}

export { useCreateDirectorio, useDirectorioById, useDirectorios }
