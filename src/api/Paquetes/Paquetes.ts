import Request from '../request'

import {
  type GetALlPaquetesRes,
  GetUserPaquetes,
  GetUserPaquetesSchema,
} from './Paquetes.type'

import { uploadImage } from '@src/utils'
import { Constants } from '@src/utils/constants'

const api = Request(Constants.ENDPOINTS.PACKAGES)

const PaquetesServices = {
  async getAllPaquetes(): Promise<GetALlPaquetesRes> {
    const { data } = await api.get<GetALlPaquetesRes>('get')

    return data
  },
  async uploadImage(uri: string) {
    const base64auth = Constants.WOOCOMMERCE.SAFE_b64_TOKEN

    const opts = {
      fieldName: 'file',
      imageUri: uri,
      type: 'image/jpeg',
      url: Constants.ENDPOINTS.UPLOAD_IMAGE,
      extraHeaders: {
        Authorization: `Basic ${base64auth}`,
      },
    }

    return await uploadImage(opts)
  },
  async getUserPaquetes(): Promise<GetUserPaquetes> {
    const { data } = await api.get('mine')
    const datavalidated = GetUserPaquetesSchema.safeParse(data)
    if (!datavalidated.success) {
      throw new Error(datavalidated.error.message)
    }

    return datavalidated.data
  },
}

export default PaquetesServices
