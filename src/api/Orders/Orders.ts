import Request from '../request'

import {
  type CreateOrderParams,
  type CreateOrderResponse,
  CreateOrderResponseSchema,
  GetMyOrdersResponse,
  GetMyOrdersResponseSchema,
  GetOrderByIdResponse,
  GetOrderByIdResponseSchema,
} from './Orders.type'

import { Constants } from '@src/utils'

const api = Request(Constants.ENDPOINTS.ORDERS)

export class OrdersServices {
  static async createOrder(
    params: CreateOrderParams,
  ): Promise<CreateOrderResponse> {
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

  static async getMyOrders(): Promise<GetMyOrdersResponse> {
    const { data } = await api.get('/mine')

    const parsed = GetMyOrdersResponseSchema.parse(data)

    return parsed
  }
}
