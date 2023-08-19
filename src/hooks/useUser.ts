import { User } from '@src/api/Usuarios'
import { useEffect } from 'react'
import { useAppSelector } from './useAppRedux'

import { useActivityHistoryStackNavigation } from '@src/hooks'
import { useDispatch } from 'react-redux'
import { logOutAction } from '@src/redux'

type logOutFunction = () => void

export function useUser(): [User, logOutFunction] {
  const user = useAppSelector((s) => s.auth.user)
  const nav = useActivityHistoryStackNavigation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) {
      nav.navigate('AuthenticationStacks')
    }
  }, [user])

  return [
    (user ?? {
      token: '',
      user_display_name: '',
      user_email: '',
      user_nicename: '',
    }) as User,
    () => {
      dispatch(logOutAction())
    },
  ]
}
