import { useQuery } from 'react-query'

import { MicrositiosQuerys } from './micrositios.query'

import { MicrositiosServices } from '@src/api'

export const useMicrositio = (id: number) => {
  return useQuery({
    queryKey: [MicrositiosQuerys.getMicrositioById, id],
    queryFn: () => MicrositiosServices.getMicrositioById(id),
  })
}
