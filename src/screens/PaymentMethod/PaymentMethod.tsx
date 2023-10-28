import React, { useCallback, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import Toast from 'react-native-toast-message'

import {
  CreateOrderParams,
  type PaymentMethods as PaymentMethodsType,
} from '@src/api'
import {
  Box,
  Button,
  Icon,
  PaymentStripeLayout,
  Text,
  TextField,
} from '@src/components'
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

type PaymentMethodProps = ScreenProps<AccountStackParamList, 'Checkout'>

export const PaymentMethod: React.FC<PaymentMethodProps> = ({
  route: { params },
  navigation,
}) => {
  const { colors } = useAppTheme()
  const [validForm, setValidForm] = useState(false)

  const [billing_address, setBilling_address] = useState('')

  const { createToken } = useStripe()
  const { mutateAsync, isLoading: loadingOrder } = useCreateOrder()

  const handlePayment = useCallback(
    (type: PaymentMethodsType) => async () => {
      if (type === 'stripe') {
        if (
          !validForm ||
          !billing_address ||
          billing_address.trim().length === 0
        ) {
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
          CLOG(error)
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

        CLOG({ form })

        try {
          const { order } = await mutateAsync(form)
          CLOG({ order })

          Toast.show({
            type: 'success',
            text1: `Orden #${order.id} generada`,
            autoHide: true,
            visibilityTime: 3000,
            onHide() {
              navigation.navigate
            },
          })
        } catch (error) {
          Toast.show({
            type: 'error',
            text1: 'Error al generar la orden',
            autoHide: true,
            visibilityTime: 1000,
          })
          CLOG({
            error,
          })
        }
      } else if (type === 'paypal') {
        //TODO: paypal
        console.log('paypal')
      }
    },
    [validForm, billing_address, params.id],
  )

  return (
    <PaymentStripeLayout>
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
