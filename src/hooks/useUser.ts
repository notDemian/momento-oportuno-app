import { useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { useDispatch } from 'react-redux'

import { useAppSelector } from './useAppRedux'

import { User } from '@src/api/Usuarios'
import { useActivityHistoryStackNavigation } from '@src/hooks'
import { logOutAction } from '@src/redux'

type logOutFunction = () => void

export function useUser(): [User, logOutFunction] {
  const user = useAppSelector((s) => s.auth.user)
  const nav = useActivityHistoryStackNavigation()
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const logOut = () => {
    dispatch(logOutAction())
    queryClient.clear()
    queryClient.resetQueries()
    queryClient.removeQueries()
  }

  useEffect(() => {
    if (!user) {
      nav.navigate('AuthenticationStacks')
      logOut()
    }
  }, [user])

  return [
    (user ?? {
      token: '',
      user_display_name: '',
      user_email: '',
      user_nicename: '',
    }) as User,
    logOut,
  ]
}
