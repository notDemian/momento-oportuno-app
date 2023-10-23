import Request from '../request'

import type {
  CreateDirectorioResponse,
  GetAllDirectoriosResponse,
  GetDirectorioByIdResponse,
} from './Directorio.type'
import {
  CreateDirectorioParams,
  CreateDirectorioResponseSchema,
  GetAllDirectoriosResponseSchema,
  GetDirectorioByIdResponseSchema,
} from './Directorio.type'

import { store } from '@src/redux'
import { Constants } from '@src/utils'

const api = Request(Constants.ENDPOINTS.DIRECTORY)

const DirectorioServices = {
  async getAllDirectorio(): Promise<GetAllDirectoriosResponse> {
    const { data } = await api.get('/')

    const parsed = GetAllDirectoriosResponseSchema.parse(data)

    return parsed
  },
  async getDirectorioById(
    id: number | undefined,
  ): Promise<GetDirectorioByIdResponse | null> {
    if (!id) return null

    const { data } = await api.get(`/${id}`)

    const parsed = GetDirectorioByIdResponseSchema.parse(data)

    return parsed
  },
  async createDirectorio(
    params: CreateDirectorioParams,
  ): Promise<CreateDirectorioResponse> {
    const { data } = await api.post('/', params, {
      maxBodyLength: Infinity,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    const parsed = CreateDirectorioResponseSchema.parse(data)

    return parsed
  },
}

export const generateLinkToCheckout = (
  opts:
    | {
        package: number
        type: 'package'
      }
    | {
        package: number
        directoryId: number
        type: 'directory'
      },
) => {
  const token = store.getState().auth.token
  if (!token) return null
  let baseUrl =
    `${Constants.URL.RAW}?autologin=true&type=${opts.type}&token=${token}&package=${opts.package}` as const
  if (opts.type === 'directory') {
    baseUrl += `&directory_id=${opts.directoryId}` as const
  }
  return baseUrl
}

export default DirectorioServices
