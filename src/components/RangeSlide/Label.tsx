import { FC, memo } from 'react'
import { StyleSheet,Text, View } from 'react-native'

import { palette } from '@src/theme/theme-palette'

type LabelProps = {
  text: string | number
}

const Label: FC<LabelProps> = ({ text, ...restProps }) => {
  return (
    <View style={styles.root} {...restProps}>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: palette.azulAmistoso,
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
})

export default memo(Label)
