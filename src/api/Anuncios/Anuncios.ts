import Request from '../request'

import {
  CreateAnuncioParams,
  CreateAnuncioResponse,
  CreateAnuncioResponseSchema,
  GetAdByIdResponse,
  GetAllAdsResponse,
  GetMyAdsResponse,
} from './Anuncios.type'
import {
  GetAdByIdResponseSchema,
  GetAllAdsResponseSchema,
  GetMyAdsResponseSchema,
} from './Anuncios.type'

import { FilterParams } from '@src/redux/filter'
import { Constants } from '@src/utils'

const req = Request(Constants.ENDPOINTS.LISTINGS)
export class AnunciosServices {
  /**
   * @throws {AxiosError}
   */
  static async getAllAds({
    page = 1,
    per_page = 10,
    category,
    query,
    state,
  }: {
    page?: number
    per_page?: number
  } & FilterParams): Promise<GetAllAdsResponse> {
    let q = ''
    if (query) {
      q += `&search=${query}`
    }
    if (category) {
      q += `&category=${category}`
    }
    if (state) {
      q += `&state=${state}`
    }

    const { data } = await req.get(`?page=${page}&per_page=${per_page}` + q)
    const dataValidated = GetAllAdsResponseSchema.parse(data)

    return dataValidated
  }

  /**
   * @throws {AxiosError}
   */
  static async getAd(id: string | number): Promise<GetAdByIdResponse> {
    const { data } = await req.get(`/${id}`)

    const dataValidated = GetAdByIdResponseSchema.parse(data)

    return dataValidated
  }

  /**
   * @throws {AxiosError}
   */
  static async getMyAds(): Promise<GetMyAdsResponse> {
    const { data } = await req.get('/mine')

    const dataValidated = GetMyAdsResponseSchema.parse(data)

    return dataValidated
  }

  /**
   * @throws {AxiosError}
   */
  static async createAd(
    params: CreateAnuncioParams,
  ): Promise<CreateAnuncioResponse> {
    // params.status = 'published'
    const { data } = await req.post('/', params)

    const parsed = CreateAnuncioResponseSchema.parse(data)
    return parsed
  }
}
