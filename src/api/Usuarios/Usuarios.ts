import Request from '../request'

import type { GetMeResponse, logInParams, logInRes } from './Usuarios.type'
import {
  GeneralLogInSchema,
  GetMeResponseSchema,
  registerParams,
  registerRes,
} from './Usuarios.type'

import { Constants } from '@src/utils/constants'

const api = Request(Constants.ENDPOINTS.INDEX)

export class UsuariosServices {
  static async logIn(params: logInParams): Promise<logInRes> {
    const { data } = await api.post('/login', params)
    const parsed = GeneralLogInSchema.parse(data)

    return parsed
  }
  static async register(params: registerParams): Promise<registerRes> {
    const { data } = await api.post('/register', params)
    const parsed = GeneralLogInSchema.parse(data)

    return parsed
  }

  static async me(): Promise<GetMeResponse> {
    const res = await api.get(Constants.ENDPOINTS.USERS + '/me')

    const parsed = GetMeResponseSchema.parse(res.data)

    return parsed
  }
}
