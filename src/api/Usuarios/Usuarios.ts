import { Constants } from '@src/utils/constants'
import Request, { CustomRequest } from '../request'
// import { Main_Anuncios, getAnuncioRes } from './Anuncios.type'
import {
  logInRes,
  type logInParams,
  logInParamsSchema,
  registerParams,
  registerParamsSchema,
} from './Usuarios.type'

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
  async register(params: registerParams): Promise<logInRes> {
    const paramsValidated = registerParamsSchema.parse(params)
    const { data } = await api.post<logInRes>('/register', paramsValidated)

    return data
  },
}

export default UsuariosServices
