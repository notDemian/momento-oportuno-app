import Request from '../request'

import { type GetALlPaquetesRes } from './Paquetes.type'

import { CLOG, uploadImage } from '@src/utils'
import { Constants } from '@src/utils/constants'

const api = Request(Constants.ENDPOINTS.PACKAGES)

const PaquetesServices = {
  async getAllPaquetes(): Promise<GetALlPaquetesRes> {
    const { data } = await api.get<GetALlPaquetesRes>('get')

    return data
  },
  async uploadImage(uri: string) {
    const base64auth = Buffer.from(
      `${Constants.WOOCOMMERCE.PUBLIC_CLIENT}:${Constants.WOOCOMMERCE.SECRET_CLIENT}`,
    ).toString('base64')

    const opts = {
      fieldName: 'file',
      imageUri: uri,
      type: 'image/jpeg',
      url: Constants.ENDPOINTS.UPLOAD_IMAGE,
      extraHeaders: {
        Authorization: `Basic ${base64auth}`,
      },
    }

    CLOG(opts)

    return await uploadImage(opts)
  },
}

export default PaquetesServices
