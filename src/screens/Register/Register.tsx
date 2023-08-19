import React, { useCallback, useState } from 'react'
import { Alert } from 'react-native'
import { AuthStackParamList, ScreenProps } from '@src/navigation/types'
import { AuthenticationLayout, Box, Button, TextField } from '@src/components'
import { useLogIn, useRegister } from '@src/hooks'

export const Register: React.FC<
  ScreenProps<AuthStackParamList, 'Register'>
> = ({ navigation }) => {
  const [params, setParams] = useState<{
    username: string
    password: string
    phone: string
    email: string
  }>({
    username: '',
    password: '',
    phone: '',
    email: '',
  })

  const setParam = useCallback((key: keyof NonNullable<typeof params>) => {
    return (value: string) => setParams((p) => ({ ...p, [key]: value }))
  }, [])

  const [showPassword, setShowPassword] = useState(false)

  const [mutateLogIn, { isLoading }] = useRegister((d) => {
    Alert.alert('Inicio de sesión exitoso', `Bienvenido ${d.user_nicename}`)
  })

  const onSignIn = async () => {
    // if (!password || !username) {
    //   Alert.alert('Error', 'Please enter your password!')
    //   return
    // }
    // signIn()
  }

  const onBack = () => {
    navigation.goBack()
  }

  return (
    <AuthenticationLayout
      title='Únete para empezar'
      // subtitle='Por favor introduce tus credenciales para usar nuestro producto'
      footer={
        <>
          <Button
            label='Continuar'
            isFullWidth
            onPress={onSignIn}
            isDisabled={isLoading}
          />
          <Button
            label='¡Ya tengo cuenta!'
            isFullWidth
            variant='transparent'
            onPress={onBack}
          />
        </>
      }
    >
      <Box gap={'m'}>
        <TextField
          inputProps={{
            autoFocus: true,
            placeholder: 'Nombre de usuario',
            onChangeText: setParam('username'),
          }}
        />
        <TextField
          inputProps={{
            placeholder: 'Email',
          }}
        />
        <TextField
          inputProps={{
            placeholder: 'Teléfono',
            keyboardType: 'phone-pad',
          }}
        />
        <TextField
          inputProps={{
            placeholder: 'Contraseña',
            secureTextEntry: !showPassword,
          }}
          leftIcon={showPassword ? 'eye-off' : 'eye'}
          lefIconOnPress={() => {
            setShowPassword(!showPassword)
          }}
        />
      </Box>
    </AuthenticationLayout>
  )
}
