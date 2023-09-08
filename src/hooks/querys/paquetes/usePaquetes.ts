import { Alert } from 'react-native'
import { useQuery } from 'react-query'

import { PaquetesQuerys } from './paquetes.query'

import { PaquetesServices } from '@src/api'
import { AxiosError } from 'axios'

const usePaquetes = () => {
  return useQuery({
    queryKey: [PaquetesQuerys.getAllPaquetes],
    queryFn: PaquetesServices.getAllPaquetes,
    select(data) {
      return data.filter((paq) => paq.price > 10)
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data as { message: string } | undefined
      const message = data?.message ? data.message : 'Error'
      Alert.alert('Error', message)
    },
  })
}

export { usePaquetes }
