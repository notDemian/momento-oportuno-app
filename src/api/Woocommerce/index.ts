import WooCommerceRestApi from 'react-native-woocommerce-api'

import { Constants } from '@src/utils'

export const WooCommerceApi = new WooCommerceRestApi({
  url: Constants.URL.RAW,
  consumerKey: Constants.WOOCOMMERCE.PUBLIC_CLIENT,
  consumerSecret: Constants.WOOCOMMERCE.SECRET_CLIENT,
  version: 'wc/v3',
})
