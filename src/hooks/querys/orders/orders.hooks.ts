import { useMutation, useQuery, useQueryClient } from 'react-query'
import { AnunciosQuerys } from '../anuncios'
import { DirectoriosQuerys } from '../directorios'
import { MicrositiosQuerys } from '../micrositios'

import { OrdersMutationsKeys, OrdersQuerysKeys } from './orders.keys'

import { OrdersServices } from '@src/api'

const useCreateOrder = () => {
  const qC = useQueryClient()

  return useMutation({
    mutationFn: OrdersServices.createOrder,
    mutationKey: OrdersMutationsKeys.createOrder,
    onSuccess(data, variables, context) {
      qC.invalidateQueries(OrdersQuerysKeys.getMyOrders)
      switch (data.order.type) {
        case 'directory':
          qC.invalidateQueries(DirectoriosQuerys.getAllDirectorios)
          break
        case 'listing':
          qC.invalidateQueries(AnunciosQuerys.getAllAnuncios())
          break
        case 'microsite':
          qC.invalidateQueries(MicrositiosQuerys.getMicrositios)
          break
        default:
          qC.invalidateQueries([
            DirectoriosQuerys.getAllDirectorios,
            AnunciosQuerys.getAllAnuncios(),
            MicrositiosQuerys.getMicrositios,
          ])
          break
      }
    },
  })
}

const useGetOrderById = (id: number) => {
  return useQuery({
    queryFn: () => OrdersServices.getOrderById(id),
    queryKey: OrdersQuerysKeys.getOrderById(id),
  })
}

const useGetMyOrders = () => {
  return useQuery({
    queryKey: OrdersQuerysKeys.getMyOrders,
    queryFn: OrdersServices.getMyOrders,
  })
}

export { useCreateOrder, useGetMyOrders, useGetOrderById }
