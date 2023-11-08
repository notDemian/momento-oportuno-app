import { memo } from 'react'
import { StyleSheet, View } from 'react-native'

import { useAppTheme } from '@src/theme'

const RailSelected = () => {
  const {
    colors: { secondary },
  } = useAppTheme()
  return <View style={{ ...styles.root, backgroundColor: secondary }} />
}

export default memo(RailSelected)

const styles = StyleSheet.create({
  root: {
    height: 4,
    backgroundColor: '#4499ff',
    borderRadius: 2,
  },
})
