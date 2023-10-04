import { type FC, useCallback, useState } from 'react'
import { Alert, AlertButton } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {
  CreateDirectorio,
  DirectorioSchema,
  DirectorioType,
  Estado,
} from '@src/api'
import { generateLinkToCheckout } from '@src/api/Directorio/Directorio'
import { DirectorioVariant } from '@src/api/Woocommerce/Woocommerce.type'
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
import {
  useCreateDirectorio,
  useDirectorio,
  useDirectoriosVariations,
  useEstados,
} from '@src/hooks'
import { DirectorioStackParamList, ScreenProps } from '@src/navigation'
import { fontSize } from '@src/theme'

type CreateDirectorioScreenProps = ScreenProps<
  DirectorioStackParamList,
  'CreateDirectorio'
>
export const CreateDirectorioScreen: FC<CreateDirectorioScreenProps> = ({
  navigation,
}) => {
  const { data: estados } = useEstados()
  const { data: dirVariants } = useDirectoriosVariations()
  const { mutateAsync, data, isLoading: isCreatingDIr } = useCreateDirectorio()
  const { mutateAsync: checkDirectory } = useDirectorio()

  const [showEstadosModal, setShowEstadosModal] = useState(false)
  const [showPaquetesModal, setShowPaquetesModal] = useState(false)

  const [estado, setEstado] = useState<Estado>()
  const [paquete, setPaquete] = useState<DirectorioVariant>()
  const [form, setForm] = useState<DirectorioType>({
    address: '',
    email: '',
    hours: '',
    phone: '',
    title: '',
    type: '',
  })
  const [checked, setChecked] = useState(false)

  const [showWebModal, setShowWebModal] = useState(false)
  const [webUrl, setWebUrl] = useState('')
  const closeWebModal = useCallback(async () => {
    setShowWebModal(false)
    setWebUrl('')
    if (!data?.id) return
    const res = await checkDirectory(data.id)
    const buttons: AlertButton[] = [
      {
        text: 'Ok',
        onPress: () => {
          navigation.navigate('Directorio')
        },
      },
    ]
    if (res.status.toLowerCase() === 'published') {
      Alert.alert('Felicidades', 'Tu directorio ha sido publicado', buttons)
    } else {
      Alert.alert(
        'Tu pago ha sido cancelado :(',
        'Tu directorio no ha sido publicado',
        buttons,
      )
    }
  }, [data])

  const onSubmit = useCallback(async () => {
    const data = DirectorioSchema.safeParse(form)
    if (!data.success) {
      return Alert.alert('Error', 'Favor de llenar todos los campos')
    }
    if (!checked) {
      return Alert.alert('Error', 'Favor de aceptar los terminos y condiciones')
    }
    if (!estado) {
      return Alert.alert('Error', 'Favor de seleccionar un estado')
    }
    if (!paquete) {
      return Alert.alert('Error', 'Favor de seleccionar un paquete')
    }
    const p = {
      ...form,
      state: estado.id,
      package: paquete.id,
    }
    try {
      const res = await mutateAsync(p)
      if (!res) {
        return Alert.alert('Error', 'Ocurrio un error al crear el directorio')
      }
      const url = generateLinkToCheckout({
        directoryId: res.id,
        package: paquete.id,
      })
      if (!url) {
        return Alert.alert('Error', 'Ocurrio un error al crear el directorio')
      }
      setWebUrl(url)
      setShowWebModal(true)
    } catch (error) {
      Alert.alert('Error', 'Ocurrio un error al crear el directorio')
    }
  }, [form, checked, estado, paquete])

  const setFormValue = useCallback(
    (key: keyof CreateDirectorio) => (value: string) => {
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
              data={estados.map((e) => ({ label: e.name, value: e.id }))}
              hideModal={() => setShowEstadosModal(false)}
              title='Estado'
              onPressItem={(e) =>
                setEstado(estados.find((es) => es.id === e.value))
              }
            />
          )}
          <Button
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
          </Button>
          {dirVariants && (
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
          )}
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
