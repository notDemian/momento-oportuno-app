import { useQuery } from 'react-query'

import { DirectoriosQuerys } from './directorios.query'

import { DirectorioServices } from '@src/api'
import { mapDirectorio } from '@src/utils'

export const useDirectorios = () => {
  return useQuery({
    queryKey: [DirectoriosQuerys.getAllDirectorios],
    queryFn: DirectorioServices.getAllDirectorio,
    select(d) {
      return d.map(mapDirectorio)
    },
  })
}
