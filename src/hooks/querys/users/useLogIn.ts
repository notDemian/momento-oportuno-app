import { UseMutateFunction, useMutation, useQueryClient } from 'react-query'
// import { UsersQuerys } from './users.query'
import { User, logInParams } from '@src/api/Usuarios'
import UsuariosServices from '@src/api/Usuarios/Usuarios'
import { useDispatch } from 'react-redux'
import { setUser } from '@src/redux'
import { Alert } from 'react-native'

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
