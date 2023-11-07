import React, { useState } from 'react'

import { AuthenticationLayout, Box, Button, TextField } from '@src/components'
import { useLogIn } from '@src/hooks'
import { AuthStackParamList, ScreenProps } from '@src/navigation/types'
import { T } from '@src/utils'

export const Login: React.FC<ScreenProps<AuthStackParamList, 'Login'>> = ({
  navigation,
}) => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [mutateLogIn, { isLoading }] = useLogIn((d) => {
    T.success('Inicio de sesión exitoso', {
      text2: `Bienvenido ${d.name}`,
    })
  })

  const onPasswordFieldChange = (value: string) => {
    setPassword(value)
  }

  const onEmailFieldChange = (value: string) => {
    setEmail(value)
  }

  const onSignIn = async () => {
    if (!password || !email) {
      T.error('¡Debes introducir un email y una contraseña!')
      return
    }
    mutateLogIn({
      email,
      password,
    })
    // signIn()
  }

  const onRegister = () => {
    navigation.navigate('Register')
  }

  return (
    <AuthenticationLayout
      title='¡Bienvenido!'
      subtitle='Por favor introduce tus credenciales para iniciar sesión'
      footer={
        <>
          <Button
            label='Iniciar sesión'
            isFullWidth
            onPress={onSignIn}
            isDisabled={isLoading}
          />
          <Button
            label='No tengo cuenta'
            isFullWidth
            variant='transparent'
            onPress={onRegister}
          />
        </>
      }
    >
      <Box gap={'m'}>
        <TextField
          inputProps={{
            autoFocus: true,
            value: email,
            onChangeText: onEmailFieldChange,
            placeholder: 'Email o usuario',
          }}
        />
        <TextField
          inputProps={{
            value: password,
            onChangeText: onPasswordFieldChange,
            placeholder: 'Contraseña',
            secureTextEntry: true,
          }}
        />
      </Box>
    </AuthenticationLayout>
  )
}
