import React, { useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import Toast from 'react-native-toast-message'

import type { PaymentMethods as PaymentMethodsType } from '@src/api'
import {
  Box,
  Button,
  Icon,
  type IconProps,
  PaymentStripeLayout,
  RadioOption,
} from '@src/components'
import { paymentMethods } from '@src/data/mock-payment-method'
import { useCreateOrder } from '@src/hooks'
import { AccountStackParamList, ScreenProps } from '@src/navigation'
import { useAppTheme } from '@src/theme'
import { CLOG } from '@src/utils'
import {
  CardField,
  CardFieldInput,
  // CardFieldInput,
  useStripe,
} from '@stripe/stripe-react-native'

type PaymentMethodProps = ScreenProps<AccountStackParamList, 'CheckoutAnuncio'>

export const PaymentMethod: React.FC<PaymentMethodProps> = ({
  route: { params },
}) => {
  const data = paymentMethods.map((item) => {
    const { name, icon } = item
    return {
      label: name,
      value: name,
      rightElement: <Icon name={icon as IconProps['name']} />,
    }
  }) satisfies RadioOption[]

  const { colors } = useAppTheme()
  const [validForm, setValidForm] = useState(false)
  const [billingAddress, setBillingAddress] = useState<string>()

  const { createToken } = useStripe()
  const { mutateAsync, isLoading: loadingOrder } = useCreateOrder()

  const handlePayment = (type: PaymentMethodsType) => async () => {
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
        console.log(`Error: ${JSON.stringify(error)}`)
        return
      }

      Toast.show({
        type: 'success',
        text1: 'Generando orden...',
        autoHide: true,
        visibilityTime: 1000,
      })

      // try {
      //   if (!billingAddress)
      //     throw new Error('Debes ingresar una dirección de facturación')
      const { order } = await mutateAsync({
        type: 'listing',
        billing_address: billingAddress,
        package_id: 0,
        payment_method: type,
        related_id: params.id,
        token: token.id,
      })
      // } catch (error) {
      //   Toast.show({
      //     type: 'error',
      //     text1: 'Error al generar la orden',
      //     autoHide: true,
      //     visibilityTime: 1000,
      //   })
      //   console.log(error)
      // }
    } else if (type === 'paypal') {
      console.log('paypal')
    }
  }

  return (
    <Box flex={1} backgroundColor='card'>
      <PaymentStripeLayout>
        <Box>
          <Box
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
            paddingHorizontal='m'
          >
            <Box flex={1} height={1} backgroundColor='border' />
            <Box paddingHorizontal='s'>
              <Icon
                type='FontAwesome5'
                name='cc-stripe'
                color={colors.stripe}
              />
            </Box>
            <Box flex={1} height={1} backgroundColor='border' />
          </Box>
          <CardField
            cardStyle={inputStyles}
            style={styles.cardField}
            onCardChange={(cardDetails) => {
              CLOG(cardDetails)
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
    </Box>
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
