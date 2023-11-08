import { StyleSheet } from 'react-native'

import { isIos } from '@src/utils'

export default StyleSheet.create({
  tabItem: {
    paddingBottom: isIos ? 0 : 4,
  },
})
