import { Platform } from 'react-native'

import { Constants } from './constants'

export const isIos = Platform.OS === 'ios'

export const CLOG = (arg: unknown) => {
  if (Constants.IS_DEV) {
    console.log(`arg -> ${JSON.stringify(arg, null, 2)}`)
  }
}
