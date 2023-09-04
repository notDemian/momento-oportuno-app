import { type TypedUseSelectorHook, useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import type { AppDispatch, RootState } from '@src/redux'

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
