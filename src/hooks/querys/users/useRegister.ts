import { UseMutateFunction, useMutation, useQueryClient } from 'react-query'
// import { UsersQuerys } from './users.query'
import { User, registerParams } from '@src/api/Usuarios'
import UsuariosServices from '@src/api/Usuarios/Usuarios'
import { Alert } from 'react-native'

type callbackFn = (data: User) => void
type IUseRegister = [
  UseMutateFunction<User, unknown, registerParams, unknown>,
  {
    isLoading: boolean
    error: unknown
  },
]

export function useRegister(callbackFnOn?: callbackFn): IUseRegister {
  // const queryClient = useQueryClient()

  const {
    mutate: signUpMutation,
    isLoading,
    error,
  } = useMutation<User, unknown, registerParams, unknown>(
    (params) => UsuariosServices.register(params),
    {
      onSuccess: (data) => {
        // TODO: save the user in the state
        callbackFnOn?.(data)
      },
      onError: (_error) => {
        // TODO: on error signup
        Alert.alert('Error', 'Error al registrar el usuario')
      },
    },
  )

  return [
    signUpMutation,
    {
      isLoading,
      error,
    },
  ]
}
