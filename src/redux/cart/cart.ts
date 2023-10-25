/* eslint-disable @typescript-eslint/no-unused-vars */
import { Slices } from '../store.helper'

import { CartState } from './cart.type'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GeneralCreateAnuncioParams } from '@src/api'

const initialState: CartState = {
  paymentMethod: 'Efectivo',
  favorites: undefined,
  createAnuncioParams: {
    category_id: 0,
    description: '',
    state_id: 0,
    title: '',
    user_id: 0,
    listingAttributes: [],
  },
}

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
    setInitialParams(state, action: PayloadAction<GeneralCreateAnuncioParams>) {
      // state.createAnuncioParams = {
      //   ...(state.createAnuncioParams ?? {}),
      //   ...action.payload,
      // }
      state.createAnuncioParams = action.payload
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
