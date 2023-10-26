import { TypePackage, TypePackageSchema } from '../Paquetes'

import { z } from 'zod'

export const PaymentMethods = {
  STRIPE: 'stripe',
  PAYPAL: 'paypal',
} as const
export type PaymentMethods =
  (typeof PaymentMethods)[keyof typeof PaymentMethods]

export type CreateOrderParams = {
  billing_address: string
  // payment_method: PaymentMethods
  package_id: number
  related_id: number
  type: TypePackage
  // token: string
} & (
  | { payment_method: typeof PaymentMethods.PAYPAL }
  | { payment_method: typeof PaymentMethods.STRIPE; token: string }
)

export const OrderStatus = z.union([
  z.literal('pending'),
  z.literal('completed'),
  z.literal('paid'),
  z.literal('failed'),
])

export type OrderStatus = z.infer<typeof OrderStatus>

export const OrderSchema = z.object({
  title: z.string(),
  billing_address: z.string(),
  payment_method: z.string(),
  package_id: z.string(),
  type: TypePackageSchema,
  related_id: z.string(),
  user_id: z.number(),
  status: OrderStatus,
  payment_status: z.string(),
  subtotal: z.number(),
  tax: z.number(),
  total: z.number(),
  updated_at: z.coerce.date(),
  created_at: z.coerce.date(),
  id: z.number(),
})
export type Order = z.infer<typeof OrderSchema>

export const CreateOrderResponseSchema = z.object({
  message: z.string(),
  order: OrderSchema,
  paypal_link: z.string().nullable().optional(),
})
export type CreateOrderResponse = z.infer<typeof CreateOrderResponseSchema>
