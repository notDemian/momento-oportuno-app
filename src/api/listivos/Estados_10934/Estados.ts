import { type GetAllEstadosResponse } from './Estados.type'

import Request from '@src/api/request'
import { Constants } from '@src/utils'

const api = Request(Constants.ENDPOINTS.Listivos_ESTADOS)

const EstadosServices = {
  async getAllEstados(): Promise<GetAllEstadosResponse> {
    const { data } = await api.get<GetAllEstadosResponse>('/')

    return data
  },
}

export default EstadosServices
