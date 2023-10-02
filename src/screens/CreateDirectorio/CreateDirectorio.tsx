import { type FC, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Estado } from '@src/api'
import { DirectorioVariant } from '@src/api/Woocommerce/Woocommerce.type'
import { Box, Button, Text, TextField } from '@src/components'
import { ModalRadioButton } from '@src/components/ModalRadioButton'
import { useDirectoriosVariations, useEstados } from '@src/hooks'
import { DirectorioStackParamList, ScreenProps } from '@src/navigation'
import { fontSize } from '@src/theme'

type CreateDirectorioScreenProps = ScreenProps<
  DirectorioStackParamList,
  'CreateDirectorio'
>
export const CreateDirectorioScreen: FC<CreateDirectorioScreenProps> = ({
  navigation: _,
}) => {
  const { data: estados } = useEstados()
  const { data: dirVariants } = useDirectoriosVariations()

  const [showEstadosModal, setShowEstadosModal] = useState(false)
  const [showPaquetesModal, setShowPaquetesModal] = useState(false)

  const [estado, setEstado] = useState<Estado>()
  const [paquete, setPaquete] = useState<DirectorioVariant>()

  return (
    <KeyboardAwareScrollView contentContainerStyle={{}}>
      <Box flex={1}>
        <Box flex={1} alignItems={'center'} paddingHorizontal={'m'} gap={'s'}>
          <Text variant={'header'} color={'secondary'} textAlign={'center'}>
            Inscríbete en el directorio local
          </Text>
          <Text
            textAlign={'center'}
            variant={'subHeader'}
            fontWeight={'normal'}
          >
            Para incribirte en el directorio local es necesario llenar el
            formulario y realizar el pago de inscripción que consite en aparecer
            en el directorio por 30 días
          </Text>
          <Text
            textAlign={'center'}
            color={'orangy'}
            fontSize={fontSize.xl}
            fontWeight={'bold'}
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
            }}
            required
          />
          <TextField
            inputProps={{
              placeholder: 'Tipo de negocio',
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
            }}
            flex={1}
            height={'100%'}
            required
          />
          <TextField
            inputProps={{
              placeholder: 'Horario de funcionamiento',
            }}
            required
          />
          <TextField
            inputProps={{
              placeholder: 'Teléfono',
            }}
            required
          />
          <TextField
            inputProps={{
              placeholder: 'Email',
            }}
            required
          />
          <TextField
            inputProps={{
              placeholder: 'Sitio web',
            }}
          />
          <Button onPress={() => setShowEstadosModal(true)} isFullWidth>
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
          <Button onPress={() => setShowPaquetesModal(true)} isFullWidth>
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
              hideModal={() => setShowEstadosModal(false)}
              title='Estado'
              onPressItem={(e) =>
                setPaquete(dirVariants.find((es) => es.id === e.value))
              }
            />
          )}
        </Box>
      </Box>
    </KeyboardAwareScrollView>
  )
}
