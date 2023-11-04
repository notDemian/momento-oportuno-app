import React, { useCallback, useState } from 'react'
import { Alert, Keyboard, StyleSheet } from 'react-native'
import Toast from 'react-native-toast-message'

import {
  CreateOrderParams,
  type PaymentMethods as PaymentMethodsType,
} from '@src/api'
import {
  Box,
  Button,
  Icon,
  OrderSuccessModal,
  PaymentStripeLayout,
  Text,
  TextField,
  WebModal,
} from '@src/components'
import {
  useAppDispatch,
  useCreateOrder,
  usePreventNavigationOrPop,
} from '@src/hooks'
import type { AccountStackParamList, ScreenProps } from '@src/navigation'
import { setOrderConfirmationId } from '@src/redux'
import { useAppTheme } from '@src/theme'
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
        }

        // form.token = 'tok_visa'
        // setShowModal(true)
        // dispatch(setOrderConfirmationId(18))

        // return

        try {
          const { order } = await mutateAsync(form)

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
    [validForm, billing_address, params.id],
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
      <Text variant='header' marginBottom={'m'}>
        Datos de facturación
      </Text>
      <Box marginVertical={'m'}>
        <TextField
          inputProps={{
            placeholder: 'Dirección de facturación',
            onChangeText: (text) => setBilling_address(text),
          }}
          required
        />
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
      <Box marginTop={'m'}>
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
