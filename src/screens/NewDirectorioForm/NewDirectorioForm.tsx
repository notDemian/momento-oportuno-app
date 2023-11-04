import { type FC, useCallback } from 'react'
import { Controller, SubmitHandler } from 'react-hook-form'
import { Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-toast-message'

import { CreateDirectorioParamsSchema } from '@src/api'
import {
  ActivityIndicator,
  Box,
  Button,
  CheckBox,
  Text,
  TextField,
} from '@src/components'
import { ButtonModalGenerator } from '@src/components/ModalRadioButton'
import { useCreateDirectorio, useEstados, useForm } from '@src/hooks'
import { useUser } from '@src/hooks/useUser'
import { DirectorioStackParamList, ScreenProps } from '@src/navigation'
import { fontSize } from '@src/theme'

type NewDirectorioFormScreenProps = ScreenProps<
  DirectorioStackParamList,
  'NewDirectorioForm'
>
export const NewDirectorioFormScreen: FC<NewDirectorioFormScreenProps> = ({
  navigation,
}) => {
  const { data: estados } = useEstados()
  const { mutateAsync, isLoading: isCreatingDIr } = useCreateDirectorio()

  const { control, handleSubmit } = useForm({
    schema: CreateDirectorioParamsSchema,
    defaultValues: {
      address: '',
      email: '',
      hours: '',
      phone: '',
      state_id: -1,
      title: '',
      type: '',
      TyC: false,
    },
  })

  const [{ id }] = useUser()

  const onSubmit = useCallback<SubmitHandler<CreateDirectorioParamsSchema>>(
    async ({ TyC, ...noTyC }) => {
      try {
        const res = await mutateAsync({ ...noTyC, user_id: id })
        if (!res) {
          return Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Ocurrió un error al crear el directorio',
          })
        }
        Toast.show({
          type: 'success',
          text1: 'Éxito',
          text2: `Directorio #${res.data.id} creado correctamente`,
        })
        navigation.navigate('NewDirectorioMedia', { id: res.data.id })
      } catch (error) {
        Alert.alert('Error', 'Ocurrio un error al crear el directorio')
      }
    },
    [],
  )

  return (
    <KeyboardAwareScrollView contentContainerStyle={{}}>
      <Box flex={1}>
        <Box flex={1} alignItems={'center'} paddingHorizontal={'l'} gap={'s'}>
          <Text variant={'header'} color={'secondary'} textAlign={'center'}>
            Inscríbete en el directorio local
          </Text>
          <Text
            textAlign={'center'}
            variant={'subHeader'}
            fontWeight={'normal'}
            fontSize={fontSize.m}
          >
            Para incribirte en el directorio local es necesario llenar el
            formulario y realizar el pago de inscripción que consite en aparecer
            en el directorio por 30 días
          </Text>
          <Text
            textAlign={'center'}
            color={'orangy'}
            fontSize={fontSize.l}
            fontWeight={'normal'}
            variant={'subHeader'}
            paddingHorizontal={'s'}
          >
            Únete a nosotros y da visibilidad a tu negocio en tu comunidad
          </Text>
        </Box>
        <Box
          flex={1}
          alignItems={'center'}
          paddingHorizontal={'m'}
          gap={'m'}
          marginTop={'m'}
        >
          <Controller
            control={control}
            name='title'
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => {
              return (
                <TextField
                  inputProps={{
                    placeholder: 'Nombre del negocio',
                    onBlur,
                    onChangeText: onChange,
                    value,
                  }}
                  error={error?.message}
                />
              )
            }}
          />
          <Controller
            control={control}
            name='type'
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => {
              return (
                <TextField
                  inputProps={{
                    placeholder: 'Tipo de negocio',
                    onBlur,
                    onChangeText: onChange,
                    value,
                  }}
                  error={error?.message}
                />
              )
            }}
          />
          <Controller
            control={control}
            name='address'
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => {
              return (
                <TextField
                  inputProps={{
                    placeholder: 'Dirección',
                    onBlur,
                    onChangeText: onChange,
                    value,
                    multiline: true,
                  }}
                  error={error?.message}
                />
              )
            }}
          />
          <Controller
            control={control}
            name='hours'
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => {
              return (
                <TextField
                  inputProps={{
                    placeholder: 'Horario de funcionamiento',
                    onBlur,
                    onChangeText: onChange,
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
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => {
              return (
                <TextField
                  inputProps={{
                    placeholder: 'Teléfono',
                    onBlur,
                    onChangeText: onChange,
                    value,
                    keyboardType: 'phone-pad',
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
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => {
              return (
                <TextField
                  inputProps={{
                    placeholder: 'email',
                    onBlur,
                    onChangeText: onChange,
                    value,
                    keyboardType: 'email-address',
                  }}
                  error={error?.message}
                />
              )
            }}
          />

          <Controller
            name='state_id'
            control={control}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => {
              return (
                <>
                  <ButtonModalGenerator
                    data={
                      estados?.data.map((e) => ({
                        label: e.name,
                        value: e.id + '',
                      })) ?? []
                    }
                    onPressItem={(item) => {
                      const itemFound = estados?.data.find(
                        (e) => e.id === +item.value,
                      )

                      if (itemFound) {
                        onChange(itemFound.id)
                      }
                    }}
                    title='Estado'
                  />
                  {error && <Text color='secondary'>{error.message}</Text>}
                </>
              )
            }}
            rules={{
              required: true,
            }}
          />

          <Controller
            control={control}
            name='TyC'
            render={({ field, fieldState }) => {
              return (
                <CheckBox
                  label='Aceptar terminos y condiciones'
                  onChange={field.onChange}
                  error={fieldState?.error?.message}
                />
              )
            }}
          />
        </Box>
        <Button
          onPress={handleSubmit(onSubmit)}
          isFullWidth
          paddingHorizontal={'xl'}
          isDisabled={isCreatingDIr}
          paddingVertical={'m'}
        >
          {isCreatingDIr ? (
            <ActivityIndicator />
          ) : (
            'Crear anuncio en Directorio'
          )}
        </Button>
      </Box>
    </KeyboardAwareScrollView>
  )
}
