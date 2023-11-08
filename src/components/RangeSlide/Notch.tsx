import { FC, memo } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'

type NotchProps = ViewProps

const Notch: FC<NotchProps> = (props) => {
  return <View style={styles.root} {...props} />
}

export default memo(Notch)

const styles = StyleSheet.create({
  root: {
    width: 8,
    height: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#4499ff',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
  },
})
