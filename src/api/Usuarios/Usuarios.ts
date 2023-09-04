import Request, { CustomRequest } from '../request'

// import { Main_Anuncios, getAnuncioRes } from './Anuncios.type'
import {
  type logInParams,
  logInParamsSchema,
  logInRes,
  registerParams,
  registerParamsSchema,
  type registerRes,
} from './Usuarios.type'

import { Constants } from '@src/utils/constants'

const apiCustom = CustomRequest('/')

const api = Request(Constants.ENDPOINTS.INDEX)

const UsuariosServices = {
  async logIn(params: logInParams): Promise<logInRes> {
    const paramsValidated = logInParamsSchema.parse(params)
    const { data } = await apiCustom.post<logInRes>(
      Constants.CUSTOM_ENDPOINTS.logIn,
      paramsValidated,
    )

    return data
  },
  async register(params: registerParams): Promise<registerRes> {
    const paramsValidated = registerParamsSchema.parse(params)
    try {
      const { data } = await api.post<registerRes>(
        '/register',
        paramsValidated,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      return data
    } catch (error: any) {
      console.log({ errorOnRegister: error.response?.data })
      throw error
    }
  },
}

export default UsuariosServices
