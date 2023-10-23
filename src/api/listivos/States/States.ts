import type { GetStatesResponse } from './States.type'
import { GetStatesResponseSchema } from './States.type'

import Request from '@src/api/request'
import { Constants } from '@src/utils'

const req = Request(Constants.ENDPOINTS.STATES)
export class StatesServices {
  static async getAllEstados(): Promise<GetStatesResponse> {
    const { data } = await req.get('/')

    const parsed = GetStatesResponseSchema.parse(data)

    return parsed
  }
}
