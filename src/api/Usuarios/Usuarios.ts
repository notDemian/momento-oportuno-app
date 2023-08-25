import { Constants } from '@src/utils/constants'
import Request, { CustomRequest } from '../request'
// import { Main_Anuncios, getAnuncioRes } from './Anuncios.type'
import {
  logInRes,
  type logInParams,
  type registerRes,
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
  async register(params: registerParams): Promise<registerRes> {
    console.log({ paramsOnregister: params })
    const paramsValidated = registerParamsSchema.parse(params)
    console.log({ paramsValidatedOnregister: paramsValidated.username })
    const { data } = await api.post<registerRes>('/register', paramsValidated, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    return data
  },
}

export default UsuariosServices
