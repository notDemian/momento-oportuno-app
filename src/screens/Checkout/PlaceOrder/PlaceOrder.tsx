import React from 'react'

import { OrderSuccessModal } from './SuccessOrderModal'

import { Box, Button,Text } from '@src/components'
import { formatCurrency } from '@src/utils'

type PlaceOrderProps = {
  totalPrice: number
}

export const PlaceOrder: React.FC<PlaceOrderProps> = ({ totalPrice }) => {
  const [isSuccessOrderModalVisible, setIsSuccessOrderModalVisible] =
    React.useState(false)

  const onPlaceOrderButtonPress = () => {
    setIsSuccessOrderModalVisible(true)
  }

  return (
    <Box
      backgroundColor='card'
      padding='m'
      borderTopWidth={0.5}
      borderTopColor='border'
    >
      <Box flexDirection='row' justifyContent='space-between' marginBottom='m'>
        <Text>Total</Text>
        <Text fontWeight='bold'>{formatCurrency(totalPrice)}</Text>
      </Box>
      <Button isFullWidth onPress={onPlaceOrderButtonPress} label='Continuar' />
      <OrderSuccessModal
        isVisible={isSuccessOrderModalVisible}
        setIsVisble={setIsSuccessOrderModalVisible}
      />
    </Box>
  )
}
