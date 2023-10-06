import { FC } from 'react'
import { ScrollView } from 'react-native'

import { OrderSummary } from './OrderSummary'
import { PlaceOrder } from './PlaceOrder'

import { Box } from '@src/components'
import { AccountStackParamList, ScreenProps } from '@src/navigation'

type CheckoutProps = ScreenProps<AccountStackParamList, 'Checkout'>

export const Checkout: FC<CheckoutProps> = ({ navigation, route }) => {
  // const totalPrice = React.useMemo(() => {
  //   route.params.isFeatured
  //   return route.params.price
  // }, [route.params.price])

  return (
    <Box flex={1}>
      <ScrollView>
        <OrderSummary order={route.params} />
      </ScrollView>
      <PlaceOrder paquete={route.params} />
    </Box>
  )
}
