import { type FC, useCallback, useMemo } from 'react'
import { Dimensions, ScrollView } from 'react-native'
import { Constants } from '../../utils/constants'

import { Addons, isAd, isDirectorio, isMicrosite } from '@src/api'
import {
  Box,
  Button,
  Icon,
  Image,
  LoadingPageModal,
  OrderResumeComponent,
  Text,
} from '@src/components'
import { useAddons, useGetOrderById, useResource } from '@src/hooks'
import { AccountStackParamList, ScreenProps } from '@src/navigation'
import { fontSize, getShadowBoxProps, useAppTheme } from '@src/theme'
import { formatCurrency, getImageUrl } from '@src/utils'

type PaymentConfirmationScreenProps = ScreenProps<
  AccountStackParamList,
  'PaymentConfirmation'
>

const width = Dimensions.get('window').width

function getStatusText(str: string | null | undefined) {
  if (!str) return 'Desconocido'
  switch (str) {
    case 'pending':
      return 'Pendiente'
    case 'pending_review':
      return 'Pendiente de revisión'
    case 'paid':
      return 'Pagado'
    case 'published':
      return 'Publicado'
    case 'failed':
      return 'Fallido'
    case 'refunded':
      return 'Reembolsado'
    case 'cancelled':
      return 'Cancelado'
    case 'expired':
      return 'Expirado'
    case 'unpaid':
      return 'No pagado'
    case 'unpaid_expired':
      return 'Expirado'
    default:
      return 'Desconocido'
  }
}

export const PaymentConfirmationScreen: FC<PaymentConfirmationScreenProps> = ({
  navigation,
  route: {
    params: { id, showSuccess = false },
  },
}) => {
  // usePreventNavigationOrPop({
  //   navToPop: navigation,
  // })

  const { colors } = useAppTheme()
  const { data, isLoading } = useGetOrderById(id)
  const { data: addons } = useAddons()
  const { data: resource } = useResource(data?.data.related_id, data?.data.type)

  const jointAddons = useMemo(() => {
    const tmpArray: Addons[] = []
    data?.data.items?.forEach((addon) => {
      const addonRecord = addons?.data.find((a) => a.id === addon.addon_id)
      if (addonRecord) {
        tmpArray.push({ ...addonRecord, price: addon.price })
      }
    })
    return tmpArray
  }, [data?.data.items, addons])

  const renderExtraContentResource = useCallback(() => {
    let Content: React.ReactNode = null

    Content = null

    const d = resource?.data

    switch (true) {
      case isAd(d):
        Content = (
          <>
            <Box
              flex={1}
              flexDirection={'row'}
              justifyContent={'space-between'}
            >
              <Text variant={'body'}>• Fecha de creación</Text>
              <Text marginLeft={'m'}>{d.create_at.toLocaleDateString()}</Text>
            </Box>
            <Box
              flex={1}
              flexDirection={'row'}
              justifyContent={'space-between'}
            >
              <Text variant='body'>• Duración de tu anuncio</Text>
              <Text marginLeft={'m'}>{d.user_package?.expire} días</Text>
            </Box>
            <Box
              flex={1}
              flexDirection={'row'}
              justifyContent={'space-between'}
            >
              <Text variant='body'>• Descripción</Text>
              <Text marginLeft={'m'}>{d.description}</Text>
            </Box>
            <Box>
              <Text variant='body'>• Atributos del anuncio</Text>
              <Box flex={1} flexDirection='column'>
                {d.attributes.map((att) => (
                  <Box flex={1} flexDirection='row' key={att.id}>
                    <Box width={'60%'}>
                      <Text variant='body'>• {att.name}</Text>
                    </Box>
                    <Text marginLeft={'m'} textAlignVertical={'center'}>
                      {typeof att.value === 'string'
                        ? att.id === Constants.IDS.price
                          ? formatCurrency(att.value)
                          : att.value
                        : att.value.map((v) => v.name).join(', ')}
                    </Text>
                  </Box>
                ))}
              </Box>
            </Box>
          </>
        )
        break
      case isDirectorio(d):
        Content = (
          <>
            <Box flex={1}>
              <Text>Duración de tu anuncio</Text>
              <Text variant='body' marginLeft={'m'}>
                {d.userPackage?.expire} días
              </Text>
            </Box>
            <Box flex={1}>
              <Text>Dirección</Text>
              <Text variant='body' marginLeft={'m'}>
                {d.address}
              </Text>
            </Box>
            <Box flex={1}>
              <Text>Horario</Text>
              <Text variant='body' marginLeft={'m'}>
                {d.hours}
              </Text>
            </Box>
            <Box flex={1}>
              <Text>Tipo</Text>
              <Text variant='body' marginLeft={'m'}>
                {d.type}
              </Text>
            </Box>
            <Box flex={1}>
              <Text>Contacto</Text>
              <Text variant='body' marginLeft={'m'}>
                {d.email}
              </Text>
            </Box>
            <Box flex={1}>
              <Text>Teléfono</Text>
              <Text variant='body' marginLeft={'m'}>
                {d.phone}
              </Text>
            </Box>
            <Box flex={1}>
              <Text>Fecha de creación</Text>
              <Text variant='body' marginLeft={'m'}>
                {d.created_at.toLocaleDateString()}
              </Text>
            </Box>
          </>
        )
        break
      case isMicrosite(d):
        Content = (
          <>
            <Box flex={1}>
              <Text>Duración de tu Micrositio</Text>
              <Text variant='body' marginLeft={'m'}>
                {d.user_package?.expire} días
              </Text>
            </Box>
            {d.description?.trim().length !== 0 ?? (
              <Box flex={1}>
                <Text>Descripción</Text>
                <Text variant='body' marginLeft={'m'}>
                  {d.description}
                </Text>
              </Box>
            )}
            <Box flex={1}>
              <Text>Dirección</Text>
              <Text variant='body' marginLeft={'m'}>
                {d.address}
              </Text>
            </Box>
            <Box flex={1}>
              <Text>Correo de contacto</Text>
              <Text variant='body' marginLeft={'m'}>
                {d.email}
              </Text>
            </Box>
            <Box flex={1}>
              <Text>Teléfono de contacto</Text>
              <Text variant='body' marginLeft={'m'}>
                {d.phone}
              </Text>
            </Box>
            <Box flex={1}>
              <Text>Fecha de creación</Text>
              <Text variant='body' marginLeft={'m'}>
                {d.created_at.toLocaleDateString()}
              </Text>
            </Box>
          </>
        )
        break
      default:
        Content = null
        break
    }

    return Content
  }, [resource?.data])

  if (!data || isLoading || !resource?.data) return <LoadingPageModal loading />

  const order = data.data

  const { title, media, state } = resource.data

  const status = getStatusText(resource.data.status)

  const image = media?.find((m) => m.collection_name === 'images')

  return (
    <ScrollView>
      {showSuccess ? (
        <Box flex={1} padding='m' gap={'s'}>
          <Text variant='header' textAlign='center'>
            ¡Gracias por tu compra!
          </Text>
          <Text variant='subHeader' textAlign='center'>
            Tu pago se ha realizado con éxito.
          </Text>
        </Box>
      ) : null}
      <Box
        flex={1}
        padding='m'
        backgroundColor='primary'
        borderTopLeftRadius='l'
        borderTopRightRadius='l'
      >
        <Text
          variant='body'
          textAlign='center'
          marginVertical='s'
          color={'white'}
        >
          Detalles de la orden{' '}
          <Text
            variant='body'
            textAlign='center'
            marginBottom='m'
            color={'white'}
          >
            #{order.id}
          </Text>
        </Text>
      </Box>
      {/**DATOS GENERALES */}
      <Box
        flex={1}
        padding='m'
        borderBottomLeftRadius='l'
        borderBottomRightRadius='l'
        gap={'s'}
      >
        <Box flex={1}>
          <Text variant='header'>{order.title}</Text>
        </Box>
        {order.created_at ? (
          <Box flex={1} flexDirection='row' justifyContent='space-between'>
            <Text>Fecha de compra</Text>
            <Text variant='body'>{order.created_at.toLocaleDateString()}</Text>
          </Box>
        ) : null}
        <Box flex={1} flexDirection='row' justifyContent='space-between'>
          <Text>Método de pago</Text>
          {order.payment_method === 'paypal' ? (
            <Icon
              type='Fontisto'
              name='paypal'
              color={colors.paypal}
              size={20}
            />
          ) : (
            <Icon
              type='FontAwesome5'
              name='cc-stripe'
              color={colors.stripe}
              size={20}
            />
          )}
        </Box>
        <Box flex={1} flexDirection='row' justifyContent='space-between'>
          <Text fontSize={fontSize.l}>Total</Text>
          <Text variant='body'>${order.total} MXN</Text>
        </Box>
      </Box>
      <Box flex={1} margin={'s'}>
        <OrderResumeComponent addons={jointAddons} />
      </Box>
      <Box flex={1} margin={'m'} g='m' {...getShadowBoxProps()}>
        <Box
          flex={1}
          padding='m'
          backgroundColor='primary'
          borderTopLeftRadius='l'
          borderTopRightRadius='l'
        >
          <Text
            variant='body'
            textAlign='center'
            marginVertical='s'
            color={'white'}
          >
            Información de la publicación
          </Text>
        </Box>
        <Box p='l'>
          <Image
            source={{
              uri: image?.original_url
                ? image?.original_url
                : getImageUrl({
                    url: image?.original_url,
                    media: image,
                  }),
              // uri: IMAGE_URL_FALLBACK,
            }}
            width={width * 0.8}
            height={150}
            contentFit='cover'
            alignSelf={'center'}
            marginBottom={'m'}
          />

          <Box flex={1} flexDirection={'row'} justifyContent={'space-between'}>
            <Text variant='body'>• Título</Text>
            <Text marginLeft={'m'}>{title}</Text>
          </Box>

          <Box flex={1} flexDirection={'row'} justifyContent={'space-between'}>
            <Text variant='body'>• Estado</Text>
            <Text marginLeft={'m'}>{state?.name}</Text>
          </Box>

          <Box flex={1} flexDirection={'row'} justifyContent={'space-between'}>
            <Text variant='body'>• Estatus</Text>
            <Text
              marginLeft={'m'}
              color={
                status === 'Pagado' || status === 'Publicado'
                  ? 'success'
                  : status === 'Cancelado'
                  ? 'secondary'
                  : status === 'Pendiente' || status === 'Pendiente de revisión'
                  ? 'orangy'
                  : 'danger'
              }
            >
              {status}
            </Text>
          </Box>

          {renderExtraContentResource()}
          {status === 'Pendiente' || status === 'Pendiente de revisión' ? (
            <Box flex={1} flexDirection='row' justifyContent='center'>
              <Text variant='body' textAlign='center' color={'secondary'}>
                *Se publicará una vez que haya sido aprobada.
              </Text>
            </Box>
          ) : null}
        </Box>
        <Button
          label='Regresar al inicio'
          onPress={() => navigation.popToTop()}
        />
      </Box>
    </ScrollView>
  )
}
