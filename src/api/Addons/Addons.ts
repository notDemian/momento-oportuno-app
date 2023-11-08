import Request from '../request'

import { GetAddonsResponse, GetAddonsResponseSchema } from './Addons.type'

import { Constants } from '@src/utils'

const api = Request(Constants.ENDPOINTS.ADDONS)

export class AddonsServices {
  static async getAddons(): Promise<GetAddonsResponse> {
    const { data } = await api.get('/')

    const parsed = GetAddonsResponseSchema.parse(data)

    return parsed
  }
}
