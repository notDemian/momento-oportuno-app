import Request from '../request'

import {
  type CreateOrderParams,
  type CreateOrderResponse,
  CreateOrderResponseSchema,
  GetOrderByIdResponse,
  GetOrderByIdResponseSchema,
} from './Orders.type'

import { CLOG, Constants } from '@src/utils'

const api = Request(Constants.ENDPOINTS.ORDERS)

export class OrdersServices {
  static async createOrder(
    params: CreateOrderParams,
  ): Promise<CreateOrderResponse> {
    CLOG({
      params,
    })
    const { data } = await api.post('/', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    const parsed = CreateOrderResponseSchema.parse(data)

    return parsed
  }

  static async getOrderById(id: number): Promise<GetOrderByIdResponse> {
    const { data } = await api.get(`/${id}`)

    const parsed = GetOrderByIdResponseSchema.parse(data)

    return parsed
  }
}
