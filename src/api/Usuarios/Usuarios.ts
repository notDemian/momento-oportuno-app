import Request from '../request'

import type { GetMeResponse, logInParams, logInRes } from './Usuarios.type'
import {
  GeneralLogInSchema,
  GetMeResponseSchema,
  registerParams,
  registerRes,
} from './Usuarios.type'

import { Constants } from '@src/utils/constants'

const api = Request(Constants.ENDPOINTS.INDEX)

const UsuariosServices = {
  async logIn(params: logInParams): Promise<logInRes> {
    const { data } = await api.post('/login', params)
    const parsed = GeneralLogInSchema.parse(data)

    return parsed
  },
  async register(params: registerParams): Promise<registerRes> {
    const { data } = await api.post('/register', params)
    const parsed = GeneralLogInSchema.parse(data)

    return parsed
  },

  // async getUserById(id: string | number) {
  //   const res = await api.get<GetUserByIdResponse>(`/users/${id}`)
  //   return res.data
  // },

  // async getFavorites() {
  //   const res = await api.get<GetFavoritesResponse>('favorites/get')
  //   return res.data
  // },
  // async addFavorite(id: number) {
  //   const res = await api.post(`favorites/add/${id}`)
  //   return res.data
  // },
  // async removeFavorite(id: number) {
  //   const res = await api.delete(`favorites/delete/${id}`)
  //   return res.data
  // },

  // async toggleFavorite(id: number) {
  //   try {
  //     const res = await api.post(`favorites/add/${id}`)
  //     return res.data
  //   } catch (error) {
  //     if (!(error instanceof AxiosError)) throw error
  //     const res = await api.post(`favorites/delete/${id}`)
  //     return res.data
  //   }
  // },
  async me(): Promise<GetMeResponse> {
    const res = await api.get(Constants.ENDPOINTS.USERS + '/me')

    const parsed = GetMeResponseSchema.parse(res.data)

    return parsed
  },
}

export default UsuariosServices
