// import { UsersQuerys } from './users.query'
import { Alert } from 'react-native'
import { UseMutateFunction, useMutation } from 'react-query'
import { useDispatch } from 'react-redux'

import {
  logInParams,
  logInRes,
  User,
  UsuariosServices,
} from '@src/api/Usuarios'
import { setUser } from '@src/redux'
import { AxiosError } from 'axios'

type IUseLogIn = [
  UseMutateFunction<logInRes, AxiosError<unknown>, logInParams>,
  { isLoading: boolean; error: unknown },
]

export function useLogIn(_callbackOnSuccess?: (user: User) => void): IUseLogIn {
  const dispatch = useDispatch()

  const {
    mutate: signInMutation,
    isLoading,
    error,
  } = useMutation<logInRes, AxiosError<unknown>, logInParams>(
    (params) => UsuariosServices.logIn(params),
    {
      onSuccess: (data) => {
        dispatch(setUser(data))
        _callbackOnSuccess?.(data.user)
      },
      onError: (_error) => {
        Alert.alert('Error', 'Usuario o contraseña incorrectos')
      },
    },
  )

  return [
    signInMutation,
    {
      isLoading,
      error,
    },
  ]
}
