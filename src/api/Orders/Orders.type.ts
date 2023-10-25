import { z } from 'zod'

export const PaymentMethods = {
  STRIPE: 'stripe',
  PAYPAL: 'paypal',
} as const
export type PaymentMethods =
  (typeof PaymentMethods)[keyof typeof PaymentMethods]

export type CreateOrderParams = {
  billing_address: string
  payment_method: PaymentMethods
  package_id: number
  type: string
  related_id: number
  token: string
}

export const CreateOrderResponseSchema = z.union([
  z.object({
    paypal_url: z.string(),
  }),
  z.object({
    stripe_session_id: z.string(),
  }),
])

export type CreateOrderResponse = z.infer<typeof CreateOrderResponseSchema>
