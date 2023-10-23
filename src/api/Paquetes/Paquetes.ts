import Request from '../request'

import type {
  GetPackagesResponse,
  GetUserPackages,
  TypePackage,
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
    type?: TypePackage,
  ): Promise<GetPackagesResponse> {
    let q = ''
    if (type) {
      q = `?type=${type}`
    }
    const { data } = await req.get('/' + q)
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
