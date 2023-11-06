import { useMutation, useQuery } from 'react-query'

import { OrdersMutationsKeys, OrdersQuerysKeys } from './orders.keys'

import { OrdersServices } from '@src/api'

const useCreateOrder = () => {
  return useMutation({
    mutationFn: OrdersServices.createOrder,
    mutationKey: OrdersMutationsKeys.createOrder,
  })
}

const useGetOrderById = (id: number) => {
  return useQuery({
    queryFn: () => OrdersServices.getOrderById(id),
    queryKey: OrdersQuerysKeys.getOrderById(id),
  })
}

export { useCreateOrder, useGetOrderById }
