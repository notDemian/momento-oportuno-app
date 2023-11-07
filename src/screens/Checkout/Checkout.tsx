import React, { useCallback, useMemo, useState } from 'react'
import { Alert, Keyboard, StyleSheet } from 'react-native'

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
import { T } from '@src/utils'
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
    T.success('Pago realizado con éxito')
    const order = await { id: 1 }
    setShowModal(true)
    dispatch(setOrderConfirmationId(order.id))
  }, [params.id])

  const onPaypalError = useCallback(() => {
    T.error('Error al realizar el pago')
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

        T.info('Cargando...')

        const { error, token } = await createToken({
          type: 'Card',
        })

        if (error) {
          T.error(`Error code: ${error.code}`)
          return
        }

        T.success('Generando orden...', { visibilityTime: 1000 })

        const form: CreateOrderParams = {
          billing_address,
          package_id: params.package.id,
          payment_method: type,
          related_id: params.id,
          token: token.id,
          type: params.type,
          ...(params.type === 'listing' ? { ...addonsRecord } : {}),
        }

        try {
          const { order } = await mutateAsync(form)

          T.success(`Orden #${order.id} generada`)

          dispatch(setOrderConfirmationId(order.id))
          setShowModal(true)
        } catch (error) {
          T.error('Error al generar la orden')
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
        } catch (error) {
          T.error('Error al generar la orden')
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
