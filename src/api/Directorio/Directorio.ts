import Request from '../request'

import {
  CreateDirectorio,
  CreateDirectorioResponse,
  Directorio,
  GetAllDirectoriosRes,
} from './Directorio.type'

import { store } from '@src/redux'
import { Constants } from '@src/utils'

const api = Request('/directories')

const DirectorioServices = {
  async getAllDirectorio() {
    const { data } = await api.get<GetAllDirectoriosRes>('/get')

    return data
  },
  async getDirectorioById(id: number) {
    const { data } = await api.get<Directorio>(`/get/${id}`)

    return data
  },
  async createDirectorio(params: CreateDirectorio) {
    const { data } = await api.post<CreateDirectorioResponse>('/add', params, {
      maxBodyLength: Infinity,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    return data
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
