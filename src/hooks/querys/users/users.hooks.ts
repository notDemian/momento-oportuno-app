import { UseMutateFunction, useMutation, useQuery } from 'react-query'

import { UsersQuerys } from './users.keys'

import { RegisterErrorSchema, UsuariosServices } from '@src/api'
import type {
  LoginParams,
  logInRes,
  RegisterParams,
  registerRes,
  User,
} from '@src/api/Usuarios'
import { useAppDispatch } from '@src/hooks/useAppRedux'
import { useAuthStackNavigation } from '@src/hooks/useStackNavigation'
import { setUser } from '@src/redux'
import { T } from '@src/utils'
import { AxiosError } from 'axios'

type callbackFn = (data: registerRes) => void

function useRegister(callbackFnOn?: callbackFn) {
  // const queryClient = useQueryClient()
  const nav = useAuthStackNavigation()

  return useMutation<registerRes, unknown, RegisterParams, unknown>(
    (params) => {
      const { username, ...rest } = params
      return UsuariosServices.register(rest)
    },
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

        if (response?.status === 422) {
          const parsed = RegisterErrorSchema.safeParse(response.data)

          if (!parsed.success) {
            T.error('Error', {
              text2: 'Error en los datos',
            })
            return
          }

          T.error('Error', {
            text2: parsed.data.message
              .replace(
                'The phone has already been taken',
                'El teléfono ya está registrado',
              )
              .replace(
                'The email has already been taken',
                'El correo ya está registrado',
              )
              .replace(/(and \d+ more error)/, ''),
          })
        }

        if (response?.status === 500) {
          T.error('Error', {
            text2: 'Error en el servidor',
          })
        }
      },
    },
  )
}

type IUseLogIn = [
  UseMutateFunction<logInRes, AxiosError<unknown>, LoginParams>,
  { isLoading: boolean; error: unknown },
]

function useLogIn(_callbackOnSuccess?: (user: User) => void): IUseLogIn {
  const dispatch = useAppDispatch()

  const {
    mutate: signInMutation,
    isLoading,
    error,
  } = useMutation<logInRes, AxiosError<unknown>, LoginParams>(
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

function useChangePassword() {
  return useMutation({
    mutationFn: UsuariosServices.changePassword,
    mutationKey: UsersQuerys.changePassword,
  })
}

export { useChangePassword, useLogIn, useMe, useRegister }
