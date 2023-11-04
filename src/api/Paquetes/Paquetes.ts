import Request from '../request'

import type {
  GetPackagesParams,
  GetPackagesResponse,
  GetUserPackages,
} from './Paquetes.type'
import {
  GetPackagesResponseSchema,
  GetUserPackagesSchema,
} from './Paquetes.type'

import { Constants } from '@src/utils'

const req = Request(Constants.ENDPOINTS.PACKAGES)
export class PackagesServices {
  /**
   * @throws {AxiosError,ZodError}
   */
  static async getAllPaquetes(
    params?: GetPackagesParams,
  ): Promise<GetPackagesResponse> {
    const q = new URL('')
    if (params?.type) {
      q.searchParams.append('type', params.type)
    }
    if (params?.resource_id) {
      q.searchParams.append('resource_id', params.resource_id.toString())
    }

    const { data } = await req.get(q.toString())
    const parsed = GetPackagesResponseSchema.parse(data)

    return parsed
  }

  /**
   * @throws {AxiosError,ZodError}
   */
  static async getUserPaquetes(): Promise<GetUserPackages> {
    const { data } = await req.get('mine')

    const datavalidated = GetUserPackagesSchema.parse(data)

    return datavalidated
  }
}
