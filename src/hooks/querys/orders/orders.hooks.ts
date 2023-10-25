import { useMutation } from 'react-query'

import { OrdersMutationsKeys } from './orders.keys'

import { OrdersServices } from '@src/api'

const useCreateOrder = () => {
  return useMutation({
    mutationFn: OrdersServices.createOrder,
    mutationKey: OrdersMutationsKeys.createOrder,
  })
}

export { useCreateOrder }
