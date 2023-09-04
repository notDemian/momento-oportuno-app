import React, { FC } from 'react'
import { ScrollView } from 'react-native'
import { OrderSummary } from './OrderSummary'
import { PaymentMethod } from './PaymentMethod'
import { PlaceOrder } from './PlaceOrder'
import { Box } from '@src/components'
import { AccountStackParamList, ScreenProps } from '@src/navigation'
import { PaymentMethods } from '@src/data'
const SHIPPING_FEE = 5

type CheckoutProps = ScreenProps<AccountStackParamList, 'Checkout'>

export const Checkout: FC<CheckoutProps> = ({ navigation, route }) => {
  const totalPrice = React.useMemo(() => {
    route.params.isFeatured
    return route.params.price
  }, [route.params.price])

  return (
    <Box flex={1}>
      <ScrollView>
        <OrderSummary order={route.params} />
        <PaymentMethod />
      </ScrollView>
      <PlaceOrder totalPrice={totalPrice} />
    </Box>
  )
}
