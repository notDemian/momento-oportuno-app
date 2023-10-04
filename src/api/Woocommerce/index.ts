import { CustomRequest } from '../request'

import { NotLoggedInError } from './Woocommerce.errors'
import {
  GetDirectoriesVariantsResponse,
  GetMyOrdersResponse,
} from './Woocommerce.type'

import { store } from '@src/redux'
import { Constants } from '@src/utils'

// export const WooCommerceApi = new WooCommerceRestApi({
//   url: Constants.URL.RAW,
//   consumerKey: Constants.WOOCOMMERCE.PUBLIC_CLIENT,
//   consumerSecret: Constants.WOOCOMMERCE.SECRET_CLIENT,
//   version: 'wc/v3',
// })

const api = CustomRequest(Constants.CUSTOM_ENDPOINTS.wc)
api.interceptors.request.use((config) => {
  const base64 = Constants.WOOCOMMERCE.SAFE_b64_TOKEN
  config.headers.Authorization = `Basic ${base64}`
  return config
})

const WoocommerceService = {
  async getDirectoriosVariants(): Promise<GetDirectoriesVariantsResponse> {
    const base64 = Constants.WOOCOMMERCE.SAFE_b64_TOKEN
    const { data } = await api.get('products/11519/variations', {
      headers: {
        Authorization: `Basic ${base64}`,
      },
    })
    return data
  },
  async getOrders(): Promise<GetDirectoriesVariantsResponse> {
    const base64 = Constants.WOOCOMMERCE.SAFE_b64_TOKEN
    const { data } = await api.get('orders', {
      headers: {
        Authorization: `Basic ${base64}`,
      },
    })
    return data
  },
  async getMyOrders(): Promise<GetMyOrdersResponse> {
    const id = store.getState().auth.userId
    if (id === -1) {
      throw new NotLoggedInError()
    }
    const base64 = Constants.WOOCOMMERCE.SAFE_b64_TOKEN
    const { data } = await api.get(`orders?customer=${id}`, {
      headers: {
        Authorization: `Basic ${base64}`,
      },
    })
    return data
  },
}

export default WoocommerceService
