import type { FC } from 'react'

import { Box, Text } from '@src/components'
import { useGetOrderById, usePreventNavigationOrPop } from '@src/hooks'
import { AccountStackParamList, ScreenProps } from '@src/navigation'

type PaymentConfirmationScreenProps = ScreenProps<
  AccountStackParamList,
  'PaymentConfirmation'
>
export const PaymentConfirmationScreen: FC<PaymentConfirmationScreenProps> = ({
  navigation,
  route: {
    params: { id },
  },
}) => {
  usePreventNavigationOrPop({
    navToPop: navigation,
  })

  const { data: order } = useGetOrderById(id)

  return (
    <Box>
      <Text>PaymentConfirmationScreen</Text>
      <Text>{JSON.stringify(order, null, 2)}</Text>
    </Box>
  )
}
