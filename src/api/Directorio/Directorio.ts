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

export const generateLinkToCheckout = ({
  package: packageId,
  directoryId,
}: {
  package: number
  directoryId: number
}) => {
  const token = store.getState().auth.token
  if (!token) return null
  const url = `${Constants.URL.RAW}?autologin=true&token=${token}&package=${packageId}&directory_id=${directoryId}`
  return url
}

export default DirectorioServices
