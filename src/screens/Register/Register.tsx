import React, { useCallback, useState } from 'react'
import { Controller, SubmitHandler } from 'react-hook-form'

import { RegisterParams, RegisterParamsSchema } from '@src/api'
import { AuthenticationLayout, Box, Button, TextField } from '@src/components'
import { useForm, useRegister } from '@src/hooks'
import { AuthStackParamList, ScreenProps } from '@src/navigation/types'

export const Register: React.FC<
  ScreenProps<AuthStackParamList, 'Register'>
> = ({ navigation }) => {
  const { control, handleSubmit, reset } = useForm({
    schema: RegisterParamsSchema,
    defaultValues: {
      name: '',
      password: '',
      email: '',
      password_confirmation: '',
      phone: '',
      username: '',
    },
  })

  const [showPassword, setShowPassword] = useState(false)

  const { mutateAsync: register, isLoading } = useRegister()

  const onSignIn = useCallback<SubmitHandler<RegisterParams>>(async (data) => {
    register(data)
  }, [])

  const onBack = useCallback(() => {
    navigation.goBack()
  }, [])

  return (
    <AuthenticationLayout
      title='Únete para empezar'
      footer={
        <>
          <Button
            label='Continuar'
            isFullWidth
            onPress={handleSubmit(onSignIn)}
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
        <Controller
          control={control}
          name='name'
          render={({
            field: { onBlur, onChange, value },
            fieldState: { error },
          }) => {
            return (
              <TextField
                inputProps={{
                  autoFocus: true,
                  placeholder: 'Nombre',
                  onChangeText: onChange,
                  onBlur,
                  value,
                }}
                error={error?.message}
              />
            )
          }}
        />
        <Controller
          control={control}
          name='email'
          render={({
            field: { onBlur, onChange, value },
            fieldState: { error },
          }) => {
            return (
              <TextField
                inputProps={{
                  placeholder: 'Email',
                  onChangeText: onChange,
                  keyboardType: 'email-address',
                  onBlur,
                  value,
                }}
                error={error?.message}
              />
            )
          }}
        />
        <Controller
          control={control}
          name='phone'
          render={({
            field: { onBlur, onChange, value },
            fieldState: { error },
          }) => {
            return (
              <TextField
                inputProps={{
                  onChangeText: onChange,
                  placeholder: 'Teléfono',
                  keyboardType: 'phone-pad',
                  onBlur,
                  value,
                }}
                error={error?.message}
              />
            )
          }}
        />
        <Controller
          control={control}
          name='username'
          render={({
            field: { onBlur, onChange, value },
            fieldState: { error },
          }) => {
            return (
              <TextField
                inputProps={{
                  onChangeText: onChange,
                  placeholder: 'Nombre de usuario',
                  onBlur,
                  value,
                }}
                error={error?.message}
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
                  onChangeText: onChange,
                  placeholder: 'Contraseña',
                  secureTextEntry: !showPassword,
                  onBlur,
                  value,
                }}
                error={error?.message}
                leftIcon={showPassword ? 'eye-off' : 'eye'}
                lefIconOnPress={() => {
                  setShowPassword(!showPassword)
                }}
              />
            )
          }}
        />
        <Controller
          control={control}
          name='password_confirmation'
          render={({
            field: { onBlur, onChange, value },
            fieldState: { error },
          }) => {
            return (
              <TextField
                inputProps={{
                  onChangeText: onChange,
                  placeholder: 'Confirmar contraseña',
                  secureTextEntry: !showPassword,
                  onBlur,
                  value,
                }}
                error={error?.message}
                leftIcon={showPassword ? 'eye-off' : 'eye'}
                lefIconOnPress={() => {
                  setShowPassword(!showPassword)
                }}
              />
            )
          }}
        />
      </Box>
    </AuthenticationLayout>
  )
}
