import WooCommerceRestApi from 'react-native-woocommerce-api'
import { CustomRequest } from '../request'

import { GetDirectoriesVariantsResponse } from './Woocommerce.type'

import { Constants } from '@src/utils'

export const WooCommerceApi = new WooCommerceRestApi({
  url: Constants.URL.RAW,
  consumerKey: Constants.WOOCOMMERCE.PUBLIC_CLIENT,
  consumerSecret: Constants.WOOCOMMERCE.SECRET_CLIENT,
  version: 'wc/v3',
})

const api = CustomRequest(Constants.CUSTOM_ENDPOINTS.wc)
api.interceptors.request.use((config) => {
  const kUser = `${Constants.WOOCOMMERCE.PUBLIC_CLIENT}:${Constants.WOOCOMMERCE.SECRET_CLIENT}`
  const base64 = Buffer.from(kUser).toString('base64')

  config.headers.Authorization = `Basic ${base64}`

  return config
})

const WoocommerceService = {
  async getDirectoriosVariants(): Promise<GetDirectoriesVariantsResponse> {
    const kUser = `${Constants.WOOCOMMERCE.PUBLIC_CLIENT}:${Constants.WOOCOMMERCE.SECRET_CLIENT}`
    const base64 = Buffer.from(kUser).toString('base64')

    const { data } = await api.get('products/11519/variations', {
      headers: {
        Authorization: `Basic ${base64}`,
      },
    })

    return data
  },
}

export default WoocommerceService
