import Request from '../request'

import type {
  GetMicrositeByIdResponse,
  GetMicrositesResponse,
} from './Micrositios.type'
import {
  GetMicrositeByIdResponseSchema,
  GetMicrositesResponseSchema,
} from './Micrositios.type'

import { Constants } from '@src/utils'

const api = Request(Constants.ENDPOINTS.MICROSITIOS)

export class MicrositiosServices {
  static async getAllMicrositios(params?: {
    state?: string
  }): Promise<GetMicrositesResponse> {
    let q = '/'
    if (params?.state) {
      q = `?state=${params.state}`
    }
    const { data } = await api.get(q)
    const parsed = GetMicrositesResponseSchema.parse(data)

    return parsed
  }

  static async getMicrositioById(
    id: number,
  ): Promise<GetMicrositeByIdResponse> {
    const { data } = await api.get(`/${id}`)
    const parsed = GetMicrositeByIdResponseSchema.parse(data)

    return parsed
  }
}

export default MicrositiosServices
