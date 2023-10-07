import { GetAllFieldsResponse, GetAllFieldsResponseSchema } from './Fields.type'

import Request from '@src/api/request'
import { Constants } from '@src/utils'

const api = Request(Constants.ENDPOINTS.LISTINGS)

const FieldsServices = {
  async getAllFields(): Promise<GetAllFieldsResponse> {
    const { data } = await api.get('/fields')
    const dataValidated = GetAllFieldsResponseSchema.safeParse(data)
    if (!dataValidated.success) throw new Error(dataValidated.error.message)

    return dataValidated.data
  },
}

export default FieldsServices
