import type {
  GetCategoriesResponse,
  GetCategoryAttributes,
} from './Categories.type'
import {
  GetCategoriesResponseSchema,
  GetCategoryAttributesSchema,
} from './Categories.type'

import Request from '@src/api/request'
import { CLOG, Constants } from '@src/utils'

const req = Request(Constants.ENDPOINTS.CATEGORIAS)
export class CategoriesServices {
  /**
   * @throws {AxiosError,ZodError}
   */
  static async getAllCategorias(): Promise<GetCategoriesResponse> {
    const { data } = await req.get('/')
    const parsed = GetCategoriesResponseSchema.parse(data)
    return parsed
  }

  /**
   * @throws {AxiosError,ZodError}
   */
  static async getCategoryAttributes(
    categoryId: number,
  ): Promise<GetCategoryAttributes> {
    const { data } = await req.get(`/${categoryId}/attributes`)
    CLOG({
      rawData: data,
    })
    const parsed = GetCategoryAttributesSchema.parse(data)

    return parsed
  }
}
