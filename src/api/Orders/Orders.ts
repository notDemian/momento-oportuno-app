import Request from '../request'

import {
  type CreateOrderParams,
  type CreateOrderResponse,
  CreateOrderResponseSchema,
} from './Orders.type'

import { Constants } from '@src/utils'

const api = Request(Constants.ENDPOINTS.ORDERS)

export class OrdersServices {
  static async createOrder(
    params: CreateOrderParams,
  ): Promise<CreateOrderResponse> {
    const { data } = await api.post('/', params)

    const parsed = CreateOrderResponseSchema.parse(data)

    return parsed
  }
}
