import Toast, { ToastShowParams } from 'react-native-toast-message'

type TFunc = (message: string, options?: ToastShowParams) => void

type T = {
  error: TFunc
  success: TFunc
  info: TFunc
  warn: TFunc
}

const DEFAULT_TIME = 2_000

const T: T = {
  error: (message, opts = {}) => {
    Toast.show({
      ...opts,
      type: 'error',
      text1: message,
      position: 'top',
      visibilityTime: DEFAULT_TIME,
    })
  },
  success: (message, opts = {}) => {
    Toast.show({
      ...opts,
      type: 'success',
      text1: message,
      position: 'top',
      visibilityTime: DEFAULT_TIME,
    })
  },
  info: (message, opts = {}) => {
    Toast.show({
      ...opts,
      type: 'info',
      text1: message,
      position: 'top',
      visibilityTime: DEFAULT_TIME,
    })
  },
  warn: (message, opts = {}) => {
    Toast.show({
      ...opts,
      type: 'warn',
      text1: message,
      position: 'top',
      visibilityTime: DEFAULT_TIME,
    })
  },
}

export { T }
