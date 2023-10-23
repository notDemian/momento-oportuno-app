import { useQuery } from 'react-query'

import { MicrositiosQuerys } from './micrositios.keys'

import { MicrositiosServices } from '@src/api'

const useMicrositio = (id: number) => {
  return useQuery({
    queryKey: MicrositiosQuerys.getMicrositioById(id),
    queryFn: () => MicrositiosServices.getMicrositioById(id),
  })
}

const useMicrositios = (
  p?: Parameters<typeof MicrositiosServices.getAllMicrositios>[0],
) => {
  return useQuery({
    queryKey: MicrositiosQuerys.getMicrositios,
    queryFn: () => MicrositiosServices.getAllMicrositios(p),
  })
}

export { useMicrositio, useMicrositios }
