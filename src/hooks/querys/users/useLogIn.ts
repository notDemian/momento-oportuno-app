// import { UsersQuerys } from './users.query'
import { Alert } from 'react-native'
import { UseMutateFunction, useMutation } from 'react-query'
import { useDispatch } from 'react-redux'

import { logInParams,User } from '@src/api/Usuarios'
import UsuariosServices from '@src/api/Usuarios/Usuarios'
import { setUser } from '@src/redux'

type IUseLogIn = [
  UseMutateFunction<User, unknown, logInParams, unknown>,
  { isLoading: boolean; error: unknown },
]

export function useLogIn(_callbackOnSuccess?: (user: User) => void): IUseLogIn {
  const dispatch = useDispatch()

  const {
    mutate: signInMutation,
    isLoading,
    error,
  } = useMutation<User, unknown, logInParams, unknown>(
    (params) => UsuariosServices.logIn(params),
    {
      onSuccess: (data) => {
        dispatch(setUser(data))
        _callbackOnSuccess?.(data)
      },
      onError: (_error) => {
        console.log(_error)
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
