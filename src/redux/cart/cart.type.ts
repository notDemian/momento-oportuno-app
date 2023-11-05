import {
  Addons,
  CreateAnuncioParams,
  GeneralCreateAnuncioParams,
} from '@src/api'
import type { PaymentMethods } from '@src/data'

export interface CartState {
  paymentMethod: PaymentMethods
  favorites: number[] | undefined
  createAnuncioParams: Partial<CreateAnuncioParams> &
    Required<GeneralCreateAnuncioParams>
  orderConfirmationId: number | null

  addons: Addons[]
}
