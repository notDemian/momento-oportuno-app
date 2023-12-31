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
    // is_featured: false,
    // includes_printing: false,
    // includes_socials: false,
    // includes_video: false,
    // printing_state_id: -1,
  },
  addons: [],
  orderConfirmationId: null,
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
      const {
        category_id,
        description,
        // includes_printing,
        // includes_socials,
        // includes_video,
        // is_featured,
        // printing_state_id,
        state_id,
        title,
        user_id,
      } = action.payload
      state.createAnuncioParams.category_id = category_id
      state.createAnuncioParams.description = description
      // state.createAnuncioParams.includes_printing = includes_printing
      // state.createAnuncioParams.includes_socials = includes_socials
      // state.createAnuncioParams.includes_video = includes_video
      // state.createAnuncioParams.is_featured = is_featured
      // printing_state_id &&
      //   (state.createAnuncioParams.printing_state_id = printing_state_id)
      state.createAnuncioParams.state_id = state_id
      state.createAnuncioParams.title = title
      state.createAnuncioParams.user_id = user_id
    },
    setAddons(state, action: PayloadAction<CartState['addons']>) {
      state.addons = action.payload
    },
    addAddon(state, action: PayloadAction<CartState['addons'][number]>) {
      state.addons = [...state.addons, action.payload]
    },
    removeAddon(state, action: PayloadAction<CartState['addons'][number]>) {
      state.addons = state.addons.filter((addon) => addon !== action.payload)
    },
    setOrderConfirmationId(state, action: PayloadAction<number>) {
      state.orderConfirmationId = action.payload
    },
    resetCart(state) {
      state.paymentMethod = 'Efectivo'
      state.createAnuncioParams = {
        category_id: 0,
        description: '',
        state_id: 0,
        title: '',
        user_id: 0,
        listingAttributes: [],
        // is_featured: false,
        // includes_printing: false,
        // includes_socials: false,
        // includes_video: false,
        // printing_state_id: -1,
      }
      state.addons = []
      state.orderConfirmationId = null
    },
  },
})

export const {
  resetCart,
  setPaymentMethod,
  addToFavorites,
  toggleFavorite,
  setInitialParams,
  setOrderConfirmationId,
  setAddons,
  addAddon,
  removeAddon,
} = cartSlice.actions
export default cartSlice.reducer
