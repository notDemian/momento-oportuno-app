import { type FC, useCallback } from 'react'
import { Controller, SubmitHandler } from 'react-hook-form'
import Toast from 'react-native-toast-message'

import { CreateMicrositeParamsSchema } from '@src/api'
import { Box, Button, NewRecursoLayout, Text, TextField } from '@src/components'
import { ButtonModalGenerator } from '@src/components/ModalRadioButton'
import { useCreateMicrositio, useEstados, useForm } from '@src/hooks'
import { useUser } from '@src/hooks/useUser'
import { MicrositiosStackParamList, ScreenProps } from '@src/navigation'

type NewMicrositioFormScreenProps = ScreenProps<
  MicrositiosStackParamList,
  'NewMicrositioForm'
>
export const NewMicrositioFormScreen: FC<NewMicrositioFormScreenProps> = ({
  navigation,
}) => {
  const [{ id }] = useUser()

  const { data: estados } = useEstados()
  const { mutateAsync: createMicrosite, isLoading } = useCreateMicrositio()

  const { control, handleSubmit } = useForm({
    schema: CreateMicrositeParamsSchema,
    defaultValues: {
      address: '',
      email: '',
      phone: '',
      state_id: 0,
      title: '',
    },
  })

  const onSubmit = useCallback<SubmitHandler<CreateMicrositeParamsSchema>>(
    async (data) => {
      try {
        const res = await createMicrosite({
          ...data,
          user_id: id,
        })

        if (!res) {
          throw new Error('No se pudo crear el micrositio')
        }
        Toast.show({
          type: 'success',
          text1: 'Éxito',
          text2: `Micrositio #${res.data.id} creado correctamente`,
        })

        navigation.navigate('NewMicrositioMedia', { id: res.data.id })
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Ocurrió un error al crear el micrositio',
        })
      }
    },
    [],
  )

  return (
    <NewRecursoLayout title='Crear Micrositio'>
      <Box gap={'l'} paddingHorizontal='s'>
        <Text>Formulario de creación de micrositio</Text>
        <Controller
          name='title'
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => {
            return (
              <TextField
                inputProps={{
                  placeholder: 'Título del micrositio',
                  onBlur,
                  onChangeText: onChange,
                  value,
                }}
                error={error?.message}
              />
            )
          }}
          rules={{
            required: true,
          }}
        />
        <Controller
          name='address'
          control={control}
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
          rules={{
            required: true,
          }}
        />
        <Controller
          name='email'
          control={control}
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
          rules={{
            required: true,
          }}
        />
        <Controller
          name='phone'
          control={control}
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
          rules={{
            required: true,
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
                {error?.message && (
                  <Text color='secondary'>{error.message}</Text>
                )}
              </>
            )
          }}
          rules={{
            required: true,
          }}
        />

        <Button onPress={handleSubmit(onSubmit)} isDisabled={isLoading}>
          Crear
        </Button>
      </Box>
    </NewRecursoLayout>
  )
}
