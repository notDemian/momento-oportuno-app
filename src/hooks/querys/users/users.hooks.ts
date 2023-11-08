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
import { T } from '@src/utils'
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
        T.success('Registro exitoso', {
          text2: `${data.user.name}\nPor favor, inicia sesión`,
        })

        nav.navigate('Login')
        callbackFnOn?.(data)
      },
      onError: (_error) => {
        if (!(_error instanceof AxiosError)) return

        const { response } = _error
        if (response?.status === 409) {
          T.error('Error', {
            text2: 'El correo ya está registrado',
          })
        }

        if (response?.status === 400) {
          T.error('Error', {
            text2: 'Error en los datos',
          })
        }

        if (response?.status === 500) {
          T.error('Error', {
            text2: 'Error en el servidor',
          })
        }

        T.error('Error', {
          text2: 'Error en el servidor',
        })
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
        if (!(_error instanceof AxiosError)) return

        const { response } = _error
        if (response?.status === 404) {
          T.error('Error', {
            text2: 'Usuario no encontrado',
          })
        }

        if (response?.status === 400) {
          T.error('Error', {
            text2: 'Error en los datos',
          })
        }

        if (response?.status === 500) {
          T.error('Error', {
            text2: 'Error en el servidor',
          })
        }

        T.error('Error', {
          text2: 'Error en el servidor',
        })
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
