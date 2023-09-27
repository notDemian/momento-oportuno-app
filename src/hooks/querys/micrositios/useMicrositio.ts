import { useQuery } from 'react-query'

import { MicrositiosQuerys } from './micrositios.query'

import { MicrositiosServices } from '@src/api'
import { AxiosError } from 'axios'

export const useMicrositio = (id: number) => {
  return useQuery({
    queryKey: [MicrositiosQuerys.getMicrositioById, id],
    queryFn: () => MicrositiosServices.getMicrositioById(id),
    onError(err: AxiosError) {
      console.log(err.request)
      console.log(err.response?.data)
    },
  })
}
