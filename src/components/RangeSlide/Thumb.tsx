import { useAppTheme } from '@src/theme'
import { type FC, memo } from 'react'
import { View, StyleSheet } from 'react-native'

const THUMB_RADIUS_LOW = 12
const THUMB_RADIUS_HIGH = 16

type ThumbProps = {
  name?: 'low' | 'high'
}

const Thumb: FC<ThumbProps> = ({ name }) => {
  const { colors } = useAppTheme()
  return (
    <View
      style={{
        ...(name === 'high' ? styles.rootHigh : styles.rootLow),
        borderColor: colors.gray,
        backgroundColor: colors.border,
      }}
    />
  )
}

const styles = StyleSheet.create({
  rootLow: {
    width: THUMB_RADIUS_LOW * 2,
    height: THUMB_RADIUS_LOW * 2,
    borderRadius: THUMB_RADIUS_LOW,
    borderWidth: 2,
    borderColor: '#7f7f7f',
    backgroundColor: '#aaaaaa',
  },
  rootHigh: {
    width: THUMB_RADIUS_HIGH * 2,
    height: THUMB_RADIUS_HIGH * 2,
    borderRadius: THUMB_RADIUS_HIGH,
    borderWidth: 2,
    borderColor: '#7f7f7f',
    backgroundColor: '#ffffff',
  },
})

export default memo(Thumb)
