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

export class UsuariosServices {
  static async logIn(params: logInParams): Promise<logInRes> {
    const { data } = await api.post('/login', params)
    const parsed = GeneralLogInSchema.parse(data)

    return parsed
  }
  static async register(params: registerParams): Promise<registerRes> {
    const { data } = await api.post('/register', params)
    const parsed = GeneralLogInSchema.parse(data)

    return parsed
  }

  // static async getUserById(id: string | number) {
  //   const res = await api.get<GetUserByIdResponse>(`/users/${id}`)
  //   return res.data
  // },

  // static async getFavorites() {
  //   const res = await api.get<GetFavoritesResponse>('favorites/get')
  //   return res.data
  // },
  // static async addFavorite(id: number) {
  //   const res = await api.post(`favorites/add/${id}`)
  //   return res.data
  // },
  // static async removeFavorite(id: number) {
  //   const res = await api.delete(`favorites/delete/${id}`)
  //   return res.data
  // },

  // static async toggleFavorite(id: number) {
  //   try {
  //     const res = await api.post(`favorites/add/${id}`)
  //     return res.data
  //   } catch (error) {
  //     if (!(error instanceof AxiosError)) throw error
  //     const res = await api.post(`favorites/delete/${id}`)
  //     return res.data
  //   }
  // },
  static async me(): Promise<GetMeResponse> {
    const res = await api.get(Constants.ENDPOINTS.USERS + '/me')

    const parsed = GetMeResponseSchema.parse(res.data)

    return parsed
  }
}
