import { type FC, useCallback, useState } from 'react'
import { Alert, AlertButton } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { CreateDirectorioParams, Directorio as _, State } from '@src/api'
type a = _
import {
  ActivityIndicator,
  Box,
  Button,
  CheckBox,
  Text,
  TextField,
  WebModal,
} from '@src/components'
import { ModalRadioButton } from '@src/components/ModalRadioButton'
import { useCreateDirectorio, useDirectorioById, useEstados } from '@src/hooks'
import { useUser } from '@src/hooks/useUser'
import { DirectorioStackParamList, ScreenProps } from '@src/navigation'
import { fontSize } from '@src/theme'
import { IMAGE_URL_FALLBACK } from '@src/utils'

type CreateDirectorioScreenProps = ScreenProps<
  DirectorioStackParamList,
  'CreateDirectorio'
>
export const CreateDirectorioScreen: FC<CreateDirectorioScreenProps> = ({
  navigation,
}) => {
  const { data: estados } = useEstados()
  // const { data: dirVariants } = useDirectoriosVariations()
  const {
    mutateAsync,
    data: { data: createDirRes } = {},
    isLoading: isCreatingDIr,
  } = useCreateDirectorio()
  const { data: newDirectorio } = useDirectorioById(createDirRes?.id)

  const [showEstadosModal, setShowEstadosModal] = useState(false)

  const [estado, setEstado] = useState<State>()
  const [{ id }] = useUser()
  // const [paquete, setPaquete] = useState<DirectorioVariant>()
  const [form, setForm] = useState<CreateDirectorioParams>({
    address: '',
    email: '',
    hours: '',
    phone: '',
    state_id: -1,
    title: '',
    thumbnail: IMAGE_URL_FALLBACK,
    type: '',
    user_id: id,
  })
  const [checked, setChecked] = useState(false)

  const [showWebModal, setShowWebModal] = useState(false)
  const [webUrl, setWebUrl] = useState('')
  const closeWebModal = useCallback(async () => {
    setShowWebModal(false)
    setWebUrl('')
    if (!createDirRes?.id) return

    const buttons: AlertButton[] = [
      {
        text: 'Ok',
        onPress: () => {
          navigation.navigate('Directorio')
        },
      },
    ]
    if (newDirectorio?.data?.status.toLowerCase() === 'published') {
      Alert.alert('Felicidades', 'Tu directorio ha sido publicado', buttons)
    } else {
      // Alert.alert(
      //   'Tu pago ha sido cancelado :(',
      //   'Tu directorio no ha sido publicado',
      //   buttons,
      // )
      navigation.navigate('Directorio')
    }
  }, [createDirRes, newDirectorio])

  const onSubmit = useCallback(async () => {
    const keys = Object.keys(form).filter(
      (key) => !['state_id', 'thumbnail'].includes(key),
    )
    if (
      keys.some(
        (key) => !form[key] || ['', '-1'].includes(form[key].toString().trim()),
      ) ||
      !estado
    ) {
      return Alert.alert('Error', 'Favor de llenar todos los campos')
    }
    if (!checked) {
      return Alert.alert('Error', 'Favor de aceptar los terminos y condiciones')
    }
    if (!estado) {
      return Alert.alert('Error', 'Favor de seleccionar un estado')
    }
    // if (!paquete) {
    //   return Alert.alert('Error', 'Favor de seleccionar un paquete')
    // }
    const p: CreateDirectorioParams = {
      ...form,
      state_id: estado.id,
      // package: paquete.id,
    }
    try {
      const res = await mutateAsync(p)
      if (!res) {
        return Alert.alert('Error', 'Ocurrio un error al crear el directorio')
      }
      // const url = generateLinkToCheckout({
      //   type: 'directory',
      //   directoryId: res.data.id,
      //   package: 0,
      // })
      // if (!url) {
      //   return Alert.alert('Error', 'Ocurrio un error al crear el directorio')
      // }
      // setWebUrl(url)
      // setShowWebModal(true)
      Alert.alert(
        'Felicidades',
        'Tu directorio ha sido creado\nRecuerda que tu anuncio estará en revisión por 24 horas',
      )
      navigation.navigate('Directorio')
    } catch (error) {
      Alert.alert('Error', 'Ocurrio un error al crear el directorio')
    }
  }, [form, checked, estado])

  const setFormValue = useCallback(
    (key: keyof CreateDirectorioParams) => (value: string) => {
      setForm((prev) => ({ ...prev, [key]: value }))
    },
    [],
  )

  return (
    <KeyboardAwareScrollView contentContainerStyle={{}}>
      <WebModal
        title='Pago'
        visible={showWebModal}
        url={webUrl}
        onDismiss={closeWebModal}
        onSuccess={closeWebModal}
      />
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
          <TextField
            inputProps={{
              placeholder: 'Titulo de tu anuncio',
              onChangeText: setFormValue('title'),
            }}
            required
          />
          <TextField
            inputProps={{
              placeholder: 'Tipo de negocio',
              onChangeText: setFormValue('type'),
            }}
            required
          />
          <TextField
            inputProps={{
              placeholder: 'Dirección',
              multiline: true,
              numberOfLines: 4,
              style: {
                textAlignVertical: 'top',
              },
              onChangeText: setFormValue('address'),
            }}
            flex={1}
            height={'100%'}
            required
          />
          <TextField
            inputProps={{
              placeholder: 'Horario de funcionamiento',
              onChangeText: setFormValue('hours'),
            }}
            required
          />
          <TextField
            inputProps={{
              placeholder: 'Teléfono',
              onChangeText: setFormValue('phone'),
            }}
            required
          />
          <TextField
            inputProps={{
              placeholder: 'Email',
              onChangeText: setFormValue('email'),
            }}
            required
          />
          {/* <TextField
            inputProps={{
              placeholder: 'Sitio web',
              onChangeText: setFormValue('location'),
              // style: {
              //   texttin: palette.gray[400],
              // },
            }}
          /> */}
          <Button
            onPress={() => setShowEstadosModal(true)}
            isFullWidth
            variant={'orangy'}
            isModal
          >
            {!estado ? 'Selecciona el estado' : estado.name}
          </Button>
          {estados && (
            <ModalRadioButton
              isVisible={showEstadosModal}
              data={estados.data.map((e) => ({ label: e.name, value: e.id }))}
              hideModal={() => setShowEstadosModal(false)}
              title='Estado'
              onPressItem={(e) =>
                setEstado(estados.data.find((es) => es.id === e.value))
              }
            />
          )}
          {/* <Button
            onPress={() => {
              setShowPaquetesModal(true)
            }}
            isFullWidth
            isModal
            variant={'orangy'}
          >
            {!paquete
              ? 'Selecciona el paquete'
              : `${paquete.attributes[0].option} días por $${paquete.regular_price}`}
          </Button> */}
          {/* {dirVariants && (
            <ModalRadioButton
              isVisible={showPaquetesModal}
              data={dirVariants.map((e) => ({
                label: `${e.attributes[0].option} días por $${e.regular_price}`,
                value: e.id,
              }))}
              hideModal={() => setShowPaquetesModal(false)}
              title='Estado'
              onPressItem={(e) =>
                setPaquete(dirVariants.find((es) => es.id === e.value))
              }
            />
          )} */}
          <CheckBox
            label='Aceptar terminos y condiciones'
            onChange={(e) => {
              setChecked(e)
            }}
          />
        </Box>
        <Button
          onPress={onSubmit}
          isFullWidth
          paddingHorizontal={'xl'}
          isDisabled={isCreatingDIr}
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
