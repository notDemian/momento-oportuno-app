import { useQuery } from 'react-query'

import { MicrositiosQuerys } from './micrositios.query'

import { MicrositiosServices } from '@src/api'

export const useMicrositios = () => {
  return useQuery({
    queryKey: [MicrositiosQuerys.getMicrositios],
    queryFn: MicrositiosServices.getAllMicrositios,
  })
}
