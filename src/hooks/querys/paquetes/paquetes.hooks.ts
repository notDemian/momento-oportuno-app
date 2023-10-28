import { Alert } from 'react-native'
import { useQuery } from 'react-query'

import { PaquetesQuerys } from './paquetes.keys'

import { GetPackagesParams, PackagesServices } from '@src/api'
import { AxiosError } from 'axios'

const usePaquetes = (params?: GetPackagesParams) => {
  return useQuery({
    queryKey: PaquetesQuerys.getAllPaquetes,
    queryFn: () => PackagesServices.getAllPaquetes(params),
    onError: (error: AxiosError) => {
      const data = error.response?.data as { message: string } | undefined
      const message = data?.message ? data.message : 'Error'
      Alert.alert('Error', message)
    },
  })
}

const useUserPaquetes = () => {
  return useQuery({
    queryKey: [PaquetesQuerys.getUserPaquetes],
    queryFn: PackagesServices.getUserPaquetes,
    cacheTime: 0,
    staleTime: 0,
  })
}

export { usePaquetes, useUserPaquetes }
