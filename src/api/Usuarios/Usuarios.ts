import Request from '../request'

import type {
  ChangePasswordResponse,
  GetMeResponse,
  LoginParams,
  logInRes,
  RegisterParams,
} from './Usuarios.type'
import {
  ChangePasswordResponseSchema,
  GeneralLogInSchema,
  GetMeResponseSchema,
  registerRes,
} from './Usuarios.type'
import { ChangePasswordParamsSchema } from './Usuarios.type'

import { CLOG } from '@src/utils'
import { Constants } from '@src/utils/constants'

const api = Request(Constants.ENDPOINTS.INDEX)

export class UsuariosServices {
  static async logIn(params: LoginParams): Promise<logInRes> {
    const { data } = await api.post('/login', params)
    const parsed = GeneralLogInSchema.parse(data)

    return parsed
  }
  static async register(
    params: Omit<RegisterParams, 'username'>,
  ): Promise<registerRes> {
    CLOG({ params })

    const { data } = await api.post('/register', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    const parsed = GeneralLogInSchema.parse(data)

    return parsed
  }

  static async me(): Promise<GetMeResponse> {
    const res = await api.get(Constants.ENDPOINTS.USERS + '/me')

    const parsed = GetMeResponseSchema.parse(res.data)

    return parsed
  }
  static async changePassword(
    props: ChangePasswordParamsSchema,
  ): Promise<ChangePasswordResponse> {
    const { data } = await api.post(
      Constants.ENDPOINTS.USERS + '/change-password',
      props,
    )

    const parsed = ChangePasswordResponseSchema.parse(data)

    return parsed
  }
}
