import FilterSlice from './filter/filter'
import { logOutType } from './auth'
import AuthSlice from './auth'
import CartSlice from './cart'
import { AllSlices, type SlicesReducers } from './store.helper'
import TestSlice from './test'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { Constants } from '@src/utils/constants'
import { persistReducer, persistStore } from 'redux-persist'

// Persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: AllSlices,
}

const reducers = {
  test: TestSlice,
  auth: AuthSlice,
  cart: CartSlice,
  filter: FilterSlice,
} satisfies SlicesReducers

const rootReducer = combineReducers(reducers)

const proxyReducer = (
  state: ReturnType<typeof rootReducer> | undefined,
  action: AnyAction,
) => {
  if (action.type === logOutType) {
    return rootReducer(undefined, action)
  }
  return rootReducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, proxyReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  devTools: Constants.IS_DEV,
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
