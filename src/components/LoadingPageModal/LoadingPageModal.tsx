import type { FC } from 'react'
import { StyleSheet } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'

import { palette } from '@src/theme/theme-palette'

interface LoadingPageModalProps {
  loading: boolean
  title?: string
}

const LoadingPageModal: FC<LoadingPageModalProps> = ({
  loading,
  title,
  //  = 'Obteniendo datos..',
}) => {
  return (
    <Spinner
      visible={loading}
      textContent={title}
      textStyle={styles.spinnerTextStyle}
    />
  )
}

export default LoadingPageModal

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: palette.black,
  },
})
