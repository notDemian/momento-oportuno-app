import { TypePackageSchema } from '../Paquetes'
import { TypePackagePojo } from '../Paquetes/Paquetes.type'

import { z } from 'zod'

export const PaymentMethods = {
  STRIPE: 'stripe',
  PAYPAL: 'paypal',
} as const
export type PaymentMethods =
  (typeof PaymentMethods)[keyof typeof PaymentMethods]

export type BaseCreateOrderParams = {
  billing_address: string
  package_id: number
  related_id: number
}

export type AddonsRecord = Record<`addons[${number}]`, 1>

export type CreateOrderParams = (BaseCreateOrderParams &
  (
    | { payment_method: typeof PaymentMethods.PAYPAL }
    | { payment_method: typeof PaymentMethods.STRIPE; token: string }
  )) &
  (
    | ({
        type: typeof TypePackagePojo.LISTING
      } & AddonsRecord)
    | {
        type:
          | typeof TypePackagePojo.DIRECTORY
          | typeof TypePackagePojo.MICROSITE
      }
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
  package_id: z.unknown(),
  type: TypePackageSchema,
  related_id: z.coerce.number(),
  user_id: z.number(),
  status: OrderStatus,
  payment_status: z.string(),
  subtotal: z.number(),
  tax: z.number(),
  total: z.number(),
  updated_at: z.coerce.date().nullable().optional(),
  created_at: z.coerce.date().nullable().optional(),
  id: z.number(),
})
export type Order = z.infer<typeof OrderSchema>

export const CreateOrderResponseSchema = z.object({
  message: z.string(),
  order: OrderSchema,
  paypal_link: z.string().nullable().optional(),
})
export type CreateOrderResponse = z.infer<typeof CreateOrderResponseSchema>
