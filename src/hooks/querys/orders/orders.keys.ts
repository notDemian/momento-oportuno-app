export const OrdersMutationsKeys = {
  createOrder: 'createOrder',
} as const

export const OrdersQuerysKeys = {
  getOrderById: (id: number) => ['getOrderById', id] as const,
} as const
