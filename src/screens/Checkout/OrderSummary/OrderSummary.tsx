import React from 'react'

import { Package } from '@src/api'
import { Box, Divider, Section, Text } from '@src/components'
import { formatCurrency } from '@src/utils'

type OrderSummaryProps = {
  order: Package
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  order: { price, name },
}) => {
  return (
    <Section title='Detalles de la compra'>
      <Box backgroundColor='card'>
        <Box padding='m' flexDirection='row' justifyContent='space-between'>
          <Box flexDirection='row'>
            <Text marginRight='m'>{`${1}`}</Text>
            <Box flexDirection={'row'} marginBottom='xs'>
              <Text fontWeight={'normal'}>Paquete: </Text>
              <Text fontWeight='bold'>{name}</Text>
            </Box>
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
