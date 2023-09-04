import React from 'react'
import { Box, Text, Section, Divider } from '@src/components'
import { formatCurrency } from '@src/utils'
import { useExploreStackNavigation } from '@src/hooks'
import type { PackageFakeData } from '@src/screens/Packages/mocks/package.type'

type OrderSummaryProps = {
  order: PackageFakeData
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
            {['aña'].map((cartItem, cartItemIndex) => (
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
