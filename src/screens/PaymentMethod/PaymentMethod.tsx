import React, { useCallback } from 'react'
import { ScrollView } from 'react-native'
import {
  RadioButton,
  Icon,
  RadioOption,
  type IconProps,
  Box,
} from '@src/components'
import { PaymentMethods, paymentMethods } from '@src/data/mock-payment-method'
import { useAppDispatch, useAppSelector } from '@src/hooks'
import { setPaymentMethod } from '@src/redux'

export const PaymentMethod: React.FC = () => {
  const data = paymentMethods.map((item) => {
    const { name, icon } = item
    return {
      label: name,
      value: name,
      rightElement: <Icon name={icon as IconProps['name']} />,
    }
  }) satisfies RadioOption[]

  const dispatch = useAppDispatch()

  const onItemPress = useCallback((item: RadioOption) => {
    const assertPM = (
      item: RadioOption,
    ): item is Omit<RadioOption, 'label'> & { label: PaymentMethods } => {
      return paymentMethods.map((pm) => pm.name).includes(item.label as any)
    }

    if (!assertPM(item)) {
      return
    }

    dispatch(setPaymentMethod(item.label))
  }, [])

  const methodSelected = useAppSelector((s) => s.cart.paymentMethod)
  console.log('methodSelected', methodSelected)

  return (
    <Box flex={1} backgroundColor='card'>
      <ScrollView>
        <RadioButton
          data={data}
          onItemPress={onItemPress}
          containerProps={{
            paddingHorizontal: 'm',
          }}
          value={methodSelected}
        />
      </ScrollView>
    </Box>
  )
}
