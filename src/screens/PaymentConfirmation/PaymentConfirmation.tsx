import type { FC } from 'react'

import { Box, Text } from '@src/components'
import { usePreventNavigationOrPop } from '@src/hooks'
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

  return (
    <Box>
      <Text>PaymentConfirmationScreen</Text>
      <Text>{id}</Text>
    </Box>
  )
}
