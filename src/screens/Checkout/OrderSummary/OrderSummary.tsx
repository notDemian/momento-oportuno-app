import React from 'react'

import { Paquete } from '@src/api'
import { Box, Divider, Section, Text } from '@src/components'
import { formatCurrency } from '@src/utils'

type OrderSummaryProps = {
  order: Paquete
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  order: { price },
}) => {
  return (
    <Section title='Detalles de la compra'>
      <Box backgroundColor='card'>
        <Box padding='m' flexDirection='row' justifyContent='space-between'>
          <Box flexDirection='row'>
            <Text marginRight='m'>{`${1}`}</Text>
            {['producto 1'].map((cartItem, cartItemIndex) => (
              <Box key={cartItemIndex}>
                <Text marginBottom='xs' fontWeight='bold'>
                  {cartItem}
                </Text>
              </Box>
            ))}
          </Box>
          <Text fontWeight='bold'>{formatCurrency(price)}</Text>
        </Box>
        <Divider />
        <Box padding='m'>
          <Box flexDirection='row' justifyContent='space-between'>
            <Text>Subtotal</Text>
            <Text>{formatCurrency(price)}</Text>
          </Box>
        </Box>
      </Box>
    </Section>
  )
}
