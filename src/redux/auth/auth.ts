import { createAction } from '@reduxjs/toolkit'

export const logOutType = 'auth/logOut' as const

export const logOutAction = createAction(logOutType)

export type LogOutAction = typeof logOutAction

export default logOutAction
