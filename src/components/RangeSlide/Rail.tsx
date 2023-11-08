import { memo } from 'react'
import { StyleSheet,View } from 'react-native'

import { palette } from '@src/theme/theme-palette'

const Rail = () => {
  return <View style={styles.root} />
}

export default memo(Rail)

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: palette.gray[500],
  },
})
