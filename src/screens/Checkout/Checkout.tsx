import React, { useCallback, useMemo, useState } from 'react'
import { Alert, Keyboard, StyleSheet } from 'react-native'
import Toast from 'react-native-toast-message'

import {
  Addons,
  CreateOrderParams,
  getAddonRecord,
  type PaymentMethods as PaymentMethodsType,
} from '@src/api'
import {
  Box,
  Button,
  CheckBox,
  Icon,
  OrderResumeComponent,
  OrderSuccessModal,
  PaymentStripeLayout,
  Text,
  TextField,
  WebModal,
} from '@src/components'
import {
  useAppDispatch,
  useAppSelector,
  useCreateOrder,
  usePreventNavigationOrPop,
} from '@src/hooks'
import type { AccountStackParamList, ScreenProps } from '@src/navigation'
import { setOrderConfirmationId } from '@src/redux'
import { getShadowBoxProps, useAppTheme } from '@src/theme'
import { CLOG } from '@src/utils'
import {
  CardField,
  CardFieldInput,
  // CardFieldInput,
  useStripe,
} from '@stripe/stripe-react-native'

type CheckoutProps = ScreenProps<AccountStackParamList, 'Checkout'>

export const Checkout: React.FC<CheckoutProps> = ({
  route: { params },
  navigation,
}) => {
  const { colors } = useAppTheme()
  const dispatch = useAppDispatch()
  const addonsSelected = useAppSelector((state) => state.cart.addons) ?? []

  const jointAddons = useMemo(() => {
    const tmpArray: Addons[] = []
    params.package.addons?.forEach((addon) => {
      if (addonsSelected?.some((a) => a.id === addon.id)) {
        tmpArray.push(addon)
      }
    })
    return tmpArray
  }, [params.package.addons, addonsSelected])

  CLOG({
    addonsSelectedRedux: addonsSelected,
    packageAddons: params.package.addons,
  })

  const totalAddons = useMemo(() => {
    return jointAddons.reduce((acc, addon) => {
      return acc + (addon.price ?? 0)
    }, 0)
  }, [jointAddons])

  const [validForm, setValidForm] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const [billing_address, setBilling_address] = useState('')

  const { createToken } = useStripe()
  const { mutateAsync, isLoading: loadingOrder } = useCreateOrder()

  //webmodal related
  const [visible, setVisible] = useState(false)
  const [url, setUrl] = useState('')

  const handleDismis = useCallback(() => {
    setVisible(false)
  }, [])

  const onPaypalSuccess = useCallback(async () => {
    Toast.show({
      type: 'success',
      text1: 'Pago realizado con éxito',
      autoHide: true,
      visibilityTime: 3000,
    })
    const order = await { id: 1 }
    setShowModal(true)
    dispatch(setOrderConfirmationId(order.id))
  }, [params.id])

  const onPaypalError = useCallback(() => {
    Toast.show({
      type: 'error',
      text1: 'Error al realizar el pago',
      autoHide: true,
      visibilityTime: 3000,
    })
  }, [])

  const handlePayment = useCallback(
    (type: PaymentMethodsType) => async () => {
      Keyboard.dismiss()
      const addonsRecord = getAddonRecord(jointAddons)

      if (!billing_address || billing_address.trim().length === 0) {
        Alert.alert('Error', 'Debes llenar todos los campos')
        return
      }
      if (type === 'stripe') {
        if (!validForm) {
          Alert.alert('Error', 'Debes llenar todos los campos')
          return
        }

        Toast.show({
          type: 'info',
          text1: 'Cargando...',
          autoHide: true,
          visibilityTime: 300,
        })

        const { error, token } = await createToken({
          type: 'Card',
        })

        if (error) {
          Alert.alert(`Error code: ${error.code}`, error.message)
          return
        }

        Toast.show({
          type: 'success',
          text1: 'Generando orden...',
          autoHide: true,
          visibilityTime: 1000,
        })

        const form: CreateOrderParams = {
          billing_address,
          package_id: params.package.id,
          payment_method: type,
          related_id: params.id,
          token: token.id,
          type: params.type,
          ...(params.type === 'listing' ? { ...addonsRecord } : {}),
        }

        CLOG({
          form,
        })

        try {
          const { order } = await mutateAsync(form)

          CLOG({
            order,
          })

          Toast.show({
            type: 'success',
            text1: `Orden #${order.id} generada`,
            autoHide: true,
            visibilityTime: 3000,
          })

          dispatch(setOrderConfirmationId(order.id))
          setShowModal(true)
        } catch (error) {
          Toast.show({
            type: 'error',
            text1: 'Error al generar la orden',
            autoHide: true,
            visibilityTime: 1000,
          })
        }
      } else if (type === 'paypal') {
        const form: CreateOrderParams = {
          billing_address,
          package_id: params.package.id,
          payment_method: type,
          related_id: params.id,
          type: params.type,
        }
        try {
          const { paypal_link } = await mutateAsync(form)
          if (!paypal_link) throw new Error()
          setUrl(paypal_link)
          setVisible(true)

          // Toast.show({
          //   type: 'success',
          //   text1: `Orden #${order.id} generada`,
          //   autoHide: true,
          //   visibilityTime: 3000,
          //   onHide() {
          //     navigation.navigate
          //   },
          // })
        } catch (error) {
          Toast.show({
            type: 'error',
            text1: 'Error al generar la orden',
            autoHide: true,
            visibilityTime: 1000,
          })
        }
      }
    },
    [validForm, billing_address, params.id, jointAddons],
  )

  usePreventNavigationOrPop({
    navToPop: navigation,
    skip(e) {
      return e.data.action.type === 'REPLACE'
    },
  })

  return (
    <PaymentStripeLayout>
      <OrderSuccessModal isVisible={showModal} setIsVisble={setShowModal} />
      <WebModal
        onDismiss={handleDismis}
        onSuccess={onPaypalSuccess}
        title='Paypal'
        url={url}
        visible={visible}
      />
      <Box {...getShadowBoxProps()} p={'m'}>
        <Text variant='header' marginBottom={'m'}>
          Resúmen de la orden
        </Text>
        {/* <Box
          paddingVertical='s'
          paddingHorizontal='m'
          backgroundColor='white'
          marginBottom='s'
          gap={'s'}
        >
          <Text fontWeight={'bold'}>
            Paquete: <Text fontWeight={'normal'}>{params.package.name}</Text>
          </Text>
          {jointAddons.length > 0 ? (
            <Text fontWeight={'bold'}>Complementos seleccionados</Text>
          ) : null}
          {jointAddons.map((addon) => {
            return (
              <Box
                key={addon.id}
                {...getShadowBoxProps({ borderRadius: 's' })}
                padding={'s'}
                flexDirection='row'
                justifyContent='space-between'
                alignItems='center'
                backgroundColor='creamy'
                marginBottom='s'
              >
                <Text>{addon.name}</Text>
                <Text variant='primary'>$ {addon.price} MXN</Text>
              </Box>
            )
          })}
          <Box
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Text variant={'subHeader'} color={'primary'}>
              Subtotal
            </Text>
            <Text>$ {params.package.price} MXN</Text>
          </Box>
          <Box
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Text variant={'header'}>Total</Text>
            {totalAddons > 0 ? (
              <Text>$ {params.package.price + totalAddons} MXN</Text>
            ) : (
              <Text>$ {params.package.price} MXN</Text>
            )}
          </Box>
          <Text
            color={'gray'}
            marginTop={'s'}
            marginBottom={'s'}
            fontSize={fontSize.m}
          >
            *Si seleccionaste un Complemento y no aparece aqui, no se te
            cobrará, puedes salirte y cancelar el proceso para escoger otro
            paquete
          </Text>
        </Box> */}
        <OrderResumeComponent
          paquete={params.package}
          addons={jointAddons}
          totalAddons={totalAddons}
        />
      </Box>
      <Text variant='header' marginVertical={'m'}>
        Datos de pago
      </Text>
      <Box marginVertical={'m'}>
        <TextField
          inputProps={{
            placeholder: 'Dirección de pago',
            onChangeText: (text) => setBilling_address(text),
          }}
          required
        />
        {/**FIXME: implement this */}
        <CheckBox label='Renovar automáticamente' onChange={() => {}} />
      </Box>
      <Box>
        <Box
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
          paddingHorizontal='m'
        >
          <Box flex={1} height={1} backgroundColor='border' />
          <Box paddingHorizontal='s'>
            <Icon type='FontAwesome5' name='cc-stripe' color={colors.stripe} />
          </Box>
          <Box flex={1} height={1} backgroundColor='border' />
        </Box>
        <CardField
          cardStyle={inputStyles}
          style={styles.cardField}
          onCardChange={(cardDetails) => {
            setValidForm(cardDetails.complete)
          }}
          postalCodeEnabled={false}
        />
        <Button
          label='Pagar con stripe'
          variant={'stripe'}
          onPress={handlePayment('stripe')}
          isDisabled={loadingOrder}
        />
      </Box>
      <Box marginVertical={'m'}>
        <Box
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
          paddingHorizontal='m'
        >
          <Box flex={1} height={1} backgroundColor='border' />
          <Box paddingHorizontal='s'>
            <Icon type='Fontisto' name='paypal' color={colors.paypal} />
          </Box>
          <Box flex={1} height={1} backgroundColor='border' />
        </Box>
        <Box paddingVertical={'m'}>
          <Button
            label='Pagar con PayPal'
            variant={'paypal'}
            onPress={handlePayment('paypal')}
            isDisabled={loadingOrder}
          />
        </Box>
      </Box>
    </PaymentStripeLayout>
  )
}

const styles = StyleSheet.create({
  cardField: {
    width: '100%',
    height: 50,
    marginVertical: 30,
  },
})

const inputStyles: CardFieldInput.Styles = {
  borderWidth: 1,
  backgroundColor: '#FFFFFF',
  borderColor: '#000000',
  borderRadius: 8,
  fontSize: 14,
  placeholderColor: '#999999',
}
