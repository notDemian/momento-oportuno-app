import { useCallback, useMemo } from 'react'
import { BottomSheetModal, Box, Button, Text } from '../elements'

import { LoginModalOpts } from './types'

import { useGlobalNavigation } from '@src/navigation/types'
import { useAppTheme } from '@src/theme'
import { wait } from '@src/utils/wait'
type LoginModalProps = {
  setShow: (show: boolean) => void
  show: boolean
  opts?: LoginModalOpts
}

const LoginModal = ({ setShow, show, opts }: LoginModalProps) => {
  const { colors, spacing } = useAppTheme()

  const { message, useToast } = opts ?? {}

  const { navigate } = useGlobalNavigation()

  const close = useCallback(() => {
    setShow(false)
  }, [])

  const snapPoints = useMemo(() => ['50%'], [])

  const onLogin = useCallback(async () => {
    close()
    await wait(300)
    navigate('AuthenticationStacks', {
      screen: 'Login',
    })
  }, [])

  const onRegister = useCallback(async () => {
    close()
    await wait(300)
    navigate('AuthenticationStacks', {
      screen: 'Register',
    })
  }, [])

  return (
    <BottomSheetModal isOpened={show} snapPoints={snapPoints} onClose={close}>
      <Box
        backgroundColor={'white'}
        // alignItems={'center'}
        justifyContent={'center'}
        flex={1}
      >
        <Text textAlign='center' variant='header'>
          Iniciar Sesión
        </Text>
        <Text
          textAlign='center'
          variant='body'
          marginTop='m'
          marginBottom='l'
          paddingHorizontal='l'
        >
          {message ?? 'Para continuar, inicia sesión o regístrate'}
        </Text>
        <Box marginTop='m' gap={'m'}>
          <Button label='Iniciar sesión' onPress={onLogin} />
          <Button label='Registrarse' onPress={onRegister} />
        </Box>
      </Box>
    </BottomSheetModal>
  )
}

export { LoginModal }
