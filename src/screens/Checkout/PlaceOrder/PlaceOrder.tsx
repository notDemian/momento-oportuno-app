import React, { useState } from 'react'
import { Alert } from 'react-native'

import { OrderSuccessModal } from './SuccessOrderModal'

import { Paquete } from '@src/api'
import { generateLinkToCheckout } from '@src/api'
import { Box, Button, Text, WebModal } from '@src/components'
import { formatCurrency } from '@src/utils'

type PlaceOrderProps = {
  paquete: Paquete
}

export const PlaceOrder: React.FC<PlaceOrderProps> = ({
  paquete: { price, id },
}) => {
  const [isSuccessOrderModalVisible, setIsSuccessOrderModalVisible] =
    useState(false)

  const [showWebModal, setShowWebModal] = useState(false)
  const [url, setUrl] = useState('')
  const closeWebModal = () => {
    setShowWebModal(false)
    setUrl('')
  }

  const onPlaceOrderButtonPress = () => {
    const url = generateLinkToCheckout({
      type: 'package',
      package: id,
    })
    if (!url) return Alert.alert('Error', 'No se pudo generar el link de pago')
    setUrl(url)
    setShowWebModal(true)
  }

  return (
    <Box
      backgroundColor='card'
      padding='m'
      borderTopWidth={0.5}
      borderTopColor='border'
    >
      <WebModal
        title='Pago'
        url={url}
        visible={showWebModal}
        onDismiss={closeWebModal}
        onSuccess={closeWebModal}
      />
      <Box flexDirection='row' justifyContent='space-between' marginBottom='m'>
        <Text>Total</Text>
        <Text fontWeight='bold'>{formatCurrency(price)}</Text>
      </Box>
      <Button isFullWidth onPress={onPlaceOrderButtonPress} label='Continuar' />
      <OrderSuccessModal
        isVisible={isSuccessOrderModalVisible}
        setIsVisble={setIsSuccessOrderModalVisible}
      />
    </Box>
  )
}
