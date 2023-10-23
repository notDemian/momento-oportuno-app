import { Alert, Platform, ToastAndroid } from 'react-native'

import { QueryErrors } from '@src/api/request.type'
import { isAxiosError } from 'axios'

export function handleAxiosErrWithMessageGoBack(
  error: QueryErrors | null | undefined,
  fn: () => void,
) {
  if (
    error &&
    isAxiosError(error) &&
    error.response?.data &&
    typeof error.response.data === 'object' &&
    'message' in error.response.data &&
    typeof error.response.data.message === 'string'
  ) {
    const msg =
      error.response.data.message === 'Listing not found'
        ? 'Anuncio no encontrado'
        : error.response.data.message
    if (Platform.OS === 'android')
      ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
    else Alert.alert(msg, '', [{ text: 'OK' }])
    fn()
  }
}
