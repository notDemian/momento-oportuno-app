import { Constants } from '@src/utils/constants'
import Request from '../request'
import { type GetALlPaquetesRes } from './Paquetes.type'

const api = Request(Constants.ENDPOINTS.PRODUCT)

const PaquetesServices = {
  async getAllPaquetes({
    page = 1,
    per_page = 12,
  }: {
    page?: number
    per_page?: number
  }): Promise<{
    data: GetALlPaquetesRes
    nextPage: number
  }> {
    const { data } = await api.get<GetALlPaquetesRes>(
      `?page=${page}&per_page=${per_page}`,
    )
    return { data, nextPage: page + 1 }
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
