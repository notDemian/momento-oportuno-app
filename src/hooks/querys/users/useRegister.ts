import { Alert } from 'react-native'
import { UseMutateFunction, useMutation } from 'react-query'

import { registerParams, registerRes } from '@src/api/Usuarios'
import UsuariosServices from '@src/api/Usuarios/Usuarios'
import { useAuthStackNavigation } from '@src/hooks/useStackNavigation'
import { AxiosError } from 'axios'

type callbackFn = (data: registerRes) => void
type IUseRegister = [
  UseMutateFunction<registerRes, unknown, registerParams, unknown>,
  {
    isLoading: boolean
    error: unknown
  },
]

export function useRegister(callbackFnOn?: callbackFn): IUseRegister {
  // const queryClient = useQueryClient()
  const nav = useAuthStackNavigation()

  const {
    mutate: signUpMutation,
    isLoading,
    error,
  } = useMutation<registerRes, unknown, registerParams, unknown>(
    (params) => UsuariosServices.register(params),
    {
      onSuccess: (data) => {
        Alert.alert(
          'Inicio de sesión exitoso',
          `${data.title}\nPor favor, inicia sesión`,
        )
        nav.navigate('Login')
        callbackFnOn?.(data)
      },
      onError: (_error) => {
        // TODO: on error signup
        if (!(_error instanceof AxiosError)) return

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
