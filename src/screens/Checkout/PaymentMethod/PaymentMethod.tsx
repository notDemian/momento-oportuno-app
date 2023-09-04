import React, { FC } from 'react'
import { Section, Box, Text, Icon, Button } from '@src/components'
import { useAccountStackNavigation, useAppSelector } from '@src/hooks'
import { PaymentMethods } from '@src/data'

export const PaymentMethod: FC = () => {
  const navigation = useAccountStackNavigation()

  const onAddAPromoButtonPress = () => {
    navigation.navigate('Promotion')
  }

  const onPaymentMethodButtonPress = () => {
    navigation.navigate('PaymentMethod')
  }

  const method = useAppSelector((state) => state.cart.paymentMethod)

  return (
    <Section title='Método de pago'>
      <Box
        backgroundColor='card'
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
      >
        <Box flexDirection='row' alignItems='center'>
          <Button variant='transparent' onPress={onPaymentMethodButtonPress}>
            <Box flexDirection='row' alignItems='center'>
              <Icon name='cash' isPrimary />
              <Text marginLeft='s' color='primary'>
                {method}
              </Text>
            </Box>
          </Button>
        </Box>
        <Button variant='transparent' onPress={onAddAPromoButtonPress}>
          <Text variant='primary'>¿Tienes un cupón?</Text>
        </Button>
      </Box>
    </Section>
  )
}
