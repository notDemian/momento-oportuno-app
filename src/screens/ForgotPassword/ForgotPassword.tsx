import React from 'react'

import { EmailSentModal } from './EmailSentModal'
import { ForgotPasswordProps } from './ForgotPassword.type'

import { AuthenticationLayout } from '@src/components'
import { Button, TextField } from '@src/components/elements'
import { T } from '@src/utils'

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  navigation,
}) => {
  const [email, setEmail] = React.useState('')
  const [sentEmailModalVisible, setSentEmailModalVisible] =
    React.useState(false)

  const onPasswordFieldChange = (value: string) => {
    setEmail(value)
  }

  const onConfirmButtonPress = () => {
    if (!email) {
      T.error('¡Debes introducir un email!')
      return
    }
    setSentEmailModalVisible(true)
  }

  return (
    <AuthenticationLayout
      title='¿Olvidaste tu contraseña?'
      subtitle='Introduce tu email y te enviaremos un enlace para restablecer tu contraseña'
      footer={
        <Button isFullWidth label='Continuar' onPress={onConfirmButtonPress} />
      }
    >
      <TextField
        inputProps={{
          autoFocus: true,
          value: email,
          onChangeText: onPasswordFieldChange,
          placeholder: 'Email',
          keyboardType: 'email-address',
        }}
      />
      <EmailSentModal
        isVisible={sentEmailModalVisible}
        setIsVisble={setSentEmailModalVisible}
        navigation={navigation}
      />
    </AuthenticationLayout>
  )
}
