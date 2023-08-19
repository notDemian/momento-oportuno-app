import React, { useState } from 'react'
import { Alert } from 'react-native'
import { AuthStackParamList, ScreenProps } from '@src/navigation/types'
import { AuthenticationLayout, Box, Button, TextField } from '@src/components'
import { useLogIn } from '@src/hooks'

export const Login: React.FC<ScreenProps<AuthStackParamList, 'Login'>> = ({
  navigation,
}) => {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [mutateLogIn, { isLoading }] = useLogIn((d) => {
    Alert.alert('Inicio de sesión exitoso', `Bienvenido ${d.user_nicename}`)
  })

  const onPasswordFieldChange = (value: string) => {
    setPassword(value)
  }

  const onUsernameFieldChange = (value: string) => {
    setUsername(value)
  }

  const onSignIn = async () => {
    if (!password || !username) {
      Alert.alert('Error', 'Please enter your password!')
      return
    }
    mutateLogIn({
      username,
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
      subtitle='Por favor introduce tus credenciales para usar nuestro producto'
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
            value: username,
            onChangeText: onUsernameFieldChange,
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
