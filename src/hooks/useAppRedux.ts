import type { AppDispatch, RootState } from '@src/redux'
import { type TypedUseSelectorHook, useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
