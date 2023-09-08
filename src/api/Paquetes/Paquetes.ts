import Request from '../request'

import { type GetALlPaquetesRes } from './Paquetes.type'

import { Constants } from '@src/utils/constants'

const api = Request(Constants.ENDPOINTS.PACKAGES)

const PaquetesServices = {
  async getAllPaquetes(): Promise<GetALlPaquetesRes> {
    const { data } = await api.get<GetALlPaquetesRes>('get')

    return data
  },
}

export default PaquetesServices
