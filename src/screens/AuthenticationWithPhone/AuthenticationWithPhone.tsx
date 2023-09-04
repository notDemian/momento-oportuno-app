import React from 'react'
import { Alert } from 'react-native'

import { AuthenticationWithPhoneProps } from './AuthenticationWithPhone.type'

import {
  AuthenticationLayout,
  BottomSheetModal,
  Box,
  Button,
  Text,
  TextField,
} from '@src/components'
import { fontSize } from '@src/theme'
import { wait } from '@src/utils/wait'

export const AuthenticationWithPhone: React.FC<
  AuthenticationWithPhoneProps
> = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [isModalOpened, setIsModalOpened] = React.useState(false)

  const onPhoneNumberFieldChange = (value: string) => {
    setPhoneNumber(value)
  }

  const hideModal = () => {
    setIsModalOpened(false)
  }

  const onNextButtonPress = () => {
    if (!phoneNumber) {
      Alert.alert('Error', '¡Debes introducir un número telefónico!')
      return
    }
    setIsModalOpened(true)
  }

  const onConfirmButtonPress = async () => {
    setIsModalOpened(false)
    await wait(1000)
    navigation.navigate('AuthenticationCodeVerification')
  }

  return (
    <Box flex={1}>
      <AuthenticationLayout
        title='Escribe tu número de teléfono'
        subtitle='Te enviaremos un código de verificación por SMS'
        footer={
          <Button isFullWidth label='Continuar' onPress={onNextButtonPress} />
        }
      >
        <TextField
          inputProps={{
            value: phoneNumber,
            onChangeText: onPhoneNumberFieldChange,
            placeholder: 'Número de teléfono',
            keyboardType: 'phone-pad',
            autoFocus: true,
          }}
        />
      </AuthenticationLayout>
      <BottomSheetModal
        isOpened={isModalOpened}
        snapPoints={['40%']}
        onClose={hideModal}
      >
        <Box flex={1} alignItems='center' justifyContent='center'>
          <Text textAlign='center' variant='header'>
            Iniciar sesión con número de teléfono
          </Text>
          <Text
            variant='primary'
            textAlign='center'
            fontWeight='bold'
            fontSize={fontSize.l}
            marginVertical='m'
          >
            {phoneNumber}
          </Text>
          <Text textAlign='center'>
            Te enviaremos un código de verificación por SMS a este número de
            teléfono
          </Text>
          <Button
            marginTop='m'
            isFullWidth
            onPress={onConfirmButtonPress}
            label='Continuar'
          />
          <Button
            isFullWidth
            variant='transparent'
            onPress={hideModal}
            label='Cancelar'
          />
        </Box>
      </BottomSheetModal>
    </Box>
  )
}
