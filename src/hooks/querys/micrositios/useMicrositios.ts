import { useQuery } from 'react-query'

import { MicrositiosQuerys } from './micrositios.query'

import { MicrositiosServices } from '@src/api'
import { AxiosError } from 'axios'

export const useMicrositios = () => {
  return useQuery({
    queryKey: [MicrositiosQuerys.getMicrositios],
    queryFn: MicrositiosServices.getAllMicrositios,
    onError(err: AxiosError) {
      console.log(err.request)
      console.log(err.response?.data)
    },
  })
}
