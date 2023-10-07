/* eslint-disable @typescript-eslint/no-unused-vars */
import { Slices } from '../store.helper'

import { CartState } from './cart.type'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: CartState = {
  paymentMethod: 'Efectivo',
  favorites: undefined,
  createAnuncioParams: {
    attributes: [],
    categoryId: 0,
    description: '',
    name: '',
    packageId: 0,
    stateId: 0,
    subcategoryId: 0,
  },
}

export type InitialParams = Pick<
  CartState['createAnuncioParams'],
  'name' | 'description' | 'packageId' | 'stateId'
>

export const cartSlice = createSlice({
  name: Slices.Cart,
  initialState,
  reducers: {
    setPaymentMethod(state, action: PayloadAction<CartState['paymentMethod']>) {
      state.paymentMethod = action.payload
    },

    addToFavorites(
      state,
      action: PayloadAction<NonNullable<CartState['favorites']>[number]>,
    ) {
      const oldFav = state.favorites ?? []
      state.favorites = [...oldFav, action.payload]
    },
    toggleFavorite(
      state,
      action: PayloadAction<NonNullable<CartState['favorites']>[number]>,
    ) {
      const oldFav = state.favorites ?? []
      const index = oldFav.findIndex((fav) => fav === action.payload)
      if (index === -1) {
        state.favorites = [...oldFav, action.payload]
      } else {
        state.favorites = [
          ...oldFav.slice(0, index),
          ...oldFav.slice(index + 1),
        ]
      }
    },
    setInitialParams(state, action: PayloadAction<InitialParams>) {
      state.createAnuncioParams = {
        ...(state.createAnuncioParams ?? {}),
        ...action.payload,
      }
    },
    resetCart(state) {
      state.paymentMethod = 'Efectivo'
    },
  },
})

export const {
  resetCart,
  setPaymentMethod,
  addToFavorites,
  toggleFavorite,
  setInitialParams,
} = cartSlice.actions
export default cartSlice.reducer
