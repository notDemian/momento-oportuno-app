import { Alert } from 'react-native'
import { UseMutateFunction, useMutation, useQuery } from 'react-query'

import { UsersQuerys } from './users.keys'

import { UsuariosServices } from '@src/api'
import type {
  logInParams,
  logInRes,
  registerParams,
  registerRes,
  User,
} from '@src/api/Usuarios'
import { useAppDispatch } from '@src/hooks/useAppRedux'
import { useAuthStackNavigation } from '@src/hooks/useStackNavigation'
import { setUser } from '@src/redux'
import { AxiosError } from 'axios'

type callbackFn = (data: registerRes) => void
type IUseRegister = [
  UseMutateFunction<registerRes, unknown, registerParams, unknown>,
  {
    isLoading: boolean
    error: unknown
  },
]

function useRegister(callbackFnOn?: callbackFn): IUseRegister {
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
          'Registro exitoso',
          `${data.user.name}\nPor favor, inicia sesión`,
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

type IUseLogIn = [
  UseMutateFunction<logInRes, AxiosError<unknown>, logInParams>,
  { isLoading: boolean; error: unknown },
]

function useLogIn(_callbackOnSuccess?: (user: User) => void): IUseLogIn {
  const dispatch = useAppDispatch()

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

function useMe() {
  return useQuery({
    queryKey: UsersQuerys.me,
    queryFn: UsuariosServices.me,
  })
}

export { useLogIn, useMe, useRegister }
