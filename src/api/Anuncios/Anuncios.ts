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
    priceMax,
    priceMin,
  }: {
    page?: number
    per_page?: number
  } & FilterParams): Promise<GetAllAdsResponse> {
    const q = new URL('')

    q.searchParams.append('page', page.toString())
    q.searchParams.append('per_page', per_page.toString())

    if (query) {
      q.searchParams.append('search', query)
    }
    if (category) {
      q.searchParams.append('category', category.toString())
    }
    if (state) {
      q.searchParams.append('state', state.toString())
    }
    if (priceMax) {
      q.searchParams.append('price_max', priceMax.toString())
    }
    if (priceMin) {
      q.searchParams.append('price_min', priceMin.toString())
    }

    const { data } = await req.get(q.toString())
    const dataValidated = GetAllAdsResponseSchema.parse(data)

    return dataValidated
  }

  /**
   * @throws {AxiosError}
   */
  static async getAd(
    id: string | number,
    includeDrafts = false,
  ): Promise<GetAdByIdResponse> {
    const q = new URLSearchParams()
    if (includeDrafts) {
      q.append('include_drafts', 'true')
    }

    const { data } = await req.get(`/${id}?${q.toString()}`)

    const dataValidated = GetAdByIdResponseSchema.parse(data)

    return dataValidated
  }

  /**
   * @throws {AxiosError}
   */
  static async getMyAds({
    page = 1,
    per_page = 10,
  }: {
    page?: number
    per_page?: number
  }): Promise<GetMyAdsResponse> {
    const q = new URLSearchParams()
    q.append('page', page.toString())
    q.append('per_page', per_page.toString())

    const { data } = await req.get(
      '/mine?' + q.toString() + '&status=published',
    )

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
