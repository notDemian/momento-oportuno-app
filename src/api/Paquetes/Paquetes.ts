import { Constants } from '@src/utils/constants'
import Request from '../request'
import { type GetALlPaquetesRes } from './Paquetes.type'

const api = Request(Constants.ENDPOINTS.PRODUCT)

const PaquetesServices = {
  async getAllPaquetes(opts?: {
    page?: number
    per_page?: number
  }): Promise<GetALlPaquetesRes> {
    const { data } = await api.get<GetALlPaquetesRes>(
      `?per_page=${opts?.per_page ?? 25}`,
    )
    return data
  },
  // async logIn(params: logInParams): Promise<logInRes> {
  //   const paramsValidated = logInParamsSchema.parse(params)
  //   const { data } = await apiCustom.post<logInRes>(
  //     Constants.CUSTOM_ENDPOINTS.logIn,
  //     paramsValidated,
  //   )
  //   return data
  // },
  // async register(params: registerParams): Promise<registerRes> {
  //   console.log({ paramsOnregister: params })
  //   const paramsValidated = registerParamsSchema.parse(params)
  //   console.log({ paramsValidatedOnregister: paramsValidated.username })
  //   const { data } = await api.post<registerRes>('/register', paramsValidated, {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //   })
  //   return data
  // },
}

export default PaquetesServices
