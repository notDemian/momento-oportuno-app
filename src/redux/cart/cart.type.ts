import { createAnuncioParams } from '@src/api'
import type { PaymentMethods } from '@src/data'

export interface CartState {
  paymentMethod: PaymentMethods
  favorites: number[] | undefined
  createAnuncioParams: createAnuncioParams['model'] & {
    categoryId: number
    subcategoryId: number
    stateId: number
  }
}
