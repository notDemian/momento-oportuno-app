import React, { useCallback } from 'react'
import { Controller, SubmitHandler } from 'react-hook-form'

import { LoginParams, LoginParamsSchema } from '@src/api'
import { AuthenticationLayout, Box, Button, TextField } from '@src/components'
import { useForm, useLogIn } from '@src/hooks'
import { AuthStackParamList, ScreenProps } from '@src/navigation/types'
import { T } from '@src/utils'

export const Login: React.FC<ScreenProps<AuthStackParamList, 'Login'>> = ({
  navigation,
}) => {
  const { control, handleSubmit, reset } = useForm({
    schema: LoginParamsSchema,
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const [mutateLogIn, { isLoading }] = useLogIn((d) => {
    reset()
    T.success('Inicio de sesión exitoso', {
      text2: `Bienvenido ${d.name}`,
    })
  })

  const onSignIn = useCallback<SubmitHandler<LoginParams>>((data) => {
    mutateLogIn(data)
  }, [])

  const onRegister = useCallback(() => {
    navigation.navigate('Register')
  }, [])

  return (
    <AuthenticationLayout
      title='¡Bienvenido!'
      subtitle='Por favor introduce tus credenciales para iniciar sesión'
      footer={
        <>
          <Button
            label='Iniciar sesión'
            isFullWidth
            onPress={handleSubmit(onSignIn)}
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
        <Controller
          control={control}
          name='email'
          render={({ field, fieldState }) => {
            return (
              <TextField
                inputProps={{
                  autoFocus: true,
                  value: field.value,
                  onBlur: field.onBlur,
                  onChangeText: field.onChange,
                  placeholder: 'Email',
                  keyboardType: 'email-address',
                }}
                error={fieldState.error?.message}
              />
            )
          }}
        />
        <Controller
          control={control}
          name='password'
          render={({
            field: { onBlur, onChange, value },
            fieldState: { error },
          }) => {
            return (
              <TextField
                inputProps={{
                  value,
                  onChangeText: onChange,
                  onBlur,
                  placeholder: 'Contraseña',
                  secureTextEntry: true,
                }}
                error={error?.message}
              />
            )
          }}
        />
      </Box>
    </AuthenticationLayout>
  )
}
