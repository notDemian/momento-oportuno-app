import Request, { CustomRequest } from '../request'

// import { Main_Anuncios, getAnuncioRes } from './Anuncios.type'
import {
  GetFavoritesResponse,
  GetUserByIdResponse,
  type logInParams,
  logInParamsSchema,
  logInRes,
  registerParams,
  registerParamsSchema,
  type registerRes,
} from './Usuarios.type'

import { Constants } from '@src/utils/constants'
import { AxiosError } from 'axios'

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
    const paramsValidated = registerParamsSchema.parse(params)
    const { data } = await api.post<registerRes>('/register', paramsValidated, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    return data
  },

  async getUserById(id: string | number) {
    const res = await api.get<GetUserByIdResponse>(`/users/${id}`)
    return res.data
  },

  async getFavorites() {
    const res = await api.get<GetFavoritesResponse>('favorites/get')
    return res.data
  },
  async addFavorite(id: number) {
    const res = await api.post(`favorites/add/${id}`)
    return res.data
  },
  async removeFavorite(id: number) {
    const res = await api.delete(`favorites/delete/${id}`)
    return res.data
  },

  async toggleFavorite(id: number) {
    try {
      const res = await api.post(`favorites/add/${id}`)
      return res.data
    } catch (error) {
      if (!(error instanceof AxiosError)) throw error
      const res = await api.post(`favorites/delete/${id}`)
      return res.data
    }
  },
  async me() {
    const res = await api.get('users/me')

    return res.data
  },
}

export default UsuariosServices
