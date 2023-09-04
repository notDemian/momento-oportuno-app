import React, { useCallback, useState } from 'react'

import { AuthenticationLayout, Box, Button, TextField } from '@src/components'
import { useRegister } from '@src/hooks'
import { AuthStackParamList, ScreenProps } from '@src/navigation/types'

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

  const [mutateLogIn, { isLoading }] = useRegister()

  const onSignIn = useCallback(async () => {
    console.log(params)
    mutateLogIn(params)
  }, [params])

  const onBack = useCallback(() => {
    navigation.goBack()
  }, [])

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
            keyboardType: 'email-address',
            onChangeText: setParam('email'),
            autoCapitalize: 'none',
          }}
        />
        <TextField
          inputProps={{
            placeholder: 'Teléfono',
            keyboardType: 'phone-pad',
            maxLength: 10,
            onChangeText: setParam('phone'),
          }}
        />
        <TextField
          inputProps={{
            placeholder: 'Contraseña',
            secureTextEntry: !showPassword,
            onChangeText: setParam('password'),
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
