/* eslint-disable @typescript-eslint/no-unused-vars */
import { Slices } from '../store.helper'

import { CartState } from './cart.type'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: CartState = {
  paymentMethod: 'Efectivo',
}

export const cartSlice = createSlice({
  name: Slices.Cart,
  initialState,
  reducers: {
    setPaymentMethod(state, action: PayloadAction<CartState['paymentMethod']>) {
      state.paymentMethod = action.payload
    },

    resetCart(state) {
      state.paymentMethod = 'Efectivo'
    },
  },
})

export const { resetCart, setPaymentMethod } = cartSlice.actions
export default cartSlice.reducer
