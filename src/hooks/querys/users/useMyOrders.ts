import { useQuery } from 'react-query'

import { UsersQuerys } from './users.query'

import { WoocommerceService } from '@src/api'

export const useMyOrders = () => {
  return useQuery({
    queryKey: [UsersQuerys.getMyOrders],
    queryFn: WoocommerceService.getMyOrders,
  })
}
